import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  update,
  remove,
  serverTimestamp,
  onDisconnect,
  type Database,
} from 'firebase/database';
import type { GameState, Team, Penalty, GameEvent } from '../types';

// Firebase configuration - these are public client-side keys
// Users can provide their own Firebase config via environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://demo-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456789:web:abc123',
};

let app: FirebaseApp | null = null;
let database: Database | null = null;

// Initialize Firebase lazily
function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  return app;
}

function getFirebaseDatabase(): Database {
  if (!database) {
    database = getDatabase(getFirebaseApp());
  }
  return database;
}

// Check if Firebase is configured (not using demo config)
export function isFirebaseConfigured(): boolean {
  return firebaseConfig.apiKey !== 'demo-api-key' &&
         firebaseConfig.databaseURL !== 'https://demo-default-rtdb.firebaseio.com';
}

// Generate a unique game ID (6 characters, no ambiguous chars)
export function generateGameId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed I, O, 0, 1
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Shared game state structure
export interface SharedGameState {
  home: Team;
  away: Team;
  period: number;
  timeRemaining: number;
  isOvertime: boolean;
  isRunning: boolean;
  penalties: Penalty[];
  events: GameEvent[];
  hostId: string;
  createdAt: number;
  updatedAt: number;
  viewerCount: number;
}

// Sync status types
export type SyncMode = 'local' | 'host' | 'viewer';
export type SyncStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

// Create a new shared game
export async function createGame(
  state: GameState,
  hostId: string
): Promise<string> {
  const db = getFirebaseDatabase();
  const gameId = generateGameId();
  const gameRef = ref(db, `games/${gameId}`);

  const sharedState: SharedGameState = {
    home: state.home,
    away: state.away,
    period: state.period,
    timeRemaining: state.timeRemaining,
    isOvertime: state.isOvertime,
    isRunning: state.isRunning,
    penalties: state.penalties,
    events: state.events,
    hostId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    viewerCount: 0,
  };

  await set(gameRef, sharedState);

  // Set up cleanup on disconnect
  const hostRef = ref(db, `games/${gameId}/hostId`);
  onDisconnect(hostRef).remove();

  return gameId;
}

// Join an existing game as viewer
export async function joinGame(
  gameId: string,
  viewerId: string,
  onUpdate: (state: SharedGameState | null) => void
): Promise<() => void> {
  const db = getFirebaseDatabase();
  const gameRef = ref(db, `games/${gameId}`);
  const viewerRef = ref(db, `games/${gameId}/viewers/${viewerId}`);

  // Register viewer
  await set(viewerRef, {
    joinedAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
  });

  // Remove viewer on disconnect
  onDisconnect(viewerRef).remove();

  // Listen for updates
  onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Count viewers
      const viewerCount = data.viewers ? Object.keys(data.viewers).length : 0;
      onUpdate({ ...data, viewerCount });
    } else {
      onUpdate(null);
    }
  });

  // Return cleanup function
  return () => {
    off(gameRef);
    remove(viewerRef);
  };
}

// Update game state (host only)
export async function updateGame(
  gameId: string,
  state: Partial<SharedGameState>
): Promise<void> {
  const db = getFirebaseDatabase();
  const gameRef = ref(db, `games/${gameId}`);

  await update(gameRef, {
    ...state,
    updatedAt: Date.now(),
  });
}

// Leave game / cleanup
export async function leaveGame(
  gameId: string,
  isHost: boolean
): Promise<void> {
  const db = getFirebaseDatabase();

  if (isHost) {
    // Delete the entire game
    const gameRef = ref(db, `games/${gameId}`);
    await remove(gameRef);
  }
}

// Subscribe to game state changes
export function subscribeToGame(
  gameId: string,
  onUpdate: (state: SharedGameState | null) => void
): () => void {
  const db = getFirebaseDatabase();
  const gameRef = ref(db, `games/${gameId}`);

  onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const viewerCount = data.viewers ? Object.keys(data.viewers).length : 0;
      onUpdate({ ...data, viewerCount });
    } else {
      onUpdate(null);
    }
  });

  return () => {
    off(gameRef);
  };
}

// Check if a game exists
export async function checkGameExists(gameId: string): Promise<boolean> {
  const db = getFirebaseDatabase();
  const gameRef = ref(db, `games/${gameId}`);

  return new Promise((resolve) => {
    onValue(
      gameRef,
      (snapshot) => {
        resolve(snapshot.exists());
      },
      { onlyOnce: true }
    );
  });
}

// Utility to debounce updates
export function createUpdateDebouncer(
  updateFn: (state: Partial<SharedGameState>) => Promise<void>,
  delay: number = 100
): (state: Partial<SharedGameState>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let pendingState: Partial<SharedGameState> = {};

  return (state: Partial<SharedGameState>) => {
    pendingState = { ...pendingState, ...state };

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      updateFn(pendingState);
      pendingState = {};
      timeout = null;
    }, delay);
  };
}
