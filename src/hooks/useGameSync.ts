import { useState, useEffect, useCallback, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import {
  createGame,
  joinGame,
  updateGame,
  leaveGame,
  checkGameExists,
  createUpdateDebouncer,
  isFirebaseConfigured,
  generateGameId,
  type SyncMode,
  type SyncStatus,
  type SharedGameState,
} from '../utils/firebase';

export interface UseGameSyncReturn {
  syncMode: SyncMode;
  syncStatus: SyncStatus;
  gameId: string | null;
  viewerCount: number;
  error: string | null;
  isConfigured: boolean;
  startHosting: () => Promise<string>;
  joinGameById: (gameId: string) => Promise<void>;
  disconnect: () => Promise<void>;
  getShareUrl: () => string;
}

export function useGameSync(): UseGameSyncReturn {
  const [syncMode, setSyncMode] = useState<SyncMode>('local');
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('disconnected');
  const [gameId, setGameId] = useState<string | null>(null);
  const [viewerCount, setViewerCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const hostIdRef = useRef<string>(generateGameId()); // Unique host identifier
  const cleanupRef = useRef<(() => void) | null>(null);
  const debouncedUpdateRef = useRef<((state: Partial<SharedGameState>) => void) | null>(null);

  const state = useGameStore();

  // Check if Firebase is configured
  const isConfigured = isFirebaseConfigured();

  // Start hosting a game
  const startHosting = useCallback(async (): Promise<string> => {
    if (!isConfigured) {
      setError('Firebase is not configured. Add Firebase config to environment variables.');
      throw new Error('Firebase not configured');
    }

    try {
      setSyncStatus('connecting');
      setError(null);

      const newGameId = await createGame(state, hostIdRef.current);
      setGameId(newGameId);
      setSyncMode('host');
      setSyncStatus('connected');

      // Set up debounced updates
      debouncedUpdateRef.current = createUpdateDebouncer(
        (updates) => updateGame(newGameId, updates),
        100
      );

      return newGameId;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create game';
      setError(message);
      setSyncStatus('error');
      throw err;
    }
  }, [state, isConfigured]);

  // Join an existing game
  const joinGameById = useCallback(async (id: string): Promise<void> => {
    if (!isConfigured) {
      setError('Firebase is not configured. Add Firebase config to environment variables.');
      throw new Error('Firebase not configured');
    }

    try {
      setSyncStatus('connecting');
      setError(null);

      const exists = await checkGameExists(id.toUpperCase());
      if (!exists) {
        throw new Error('Game not found');
      }

      const upperGameId = id.toUpperCase();
      const viewerId = generateGameId();

      const cleanup = await joinGame(upperGameId, viewerId, (sharedState) => {
        if (sharedState) {
          // Update local state from server
          const gameStore = useGameStore.getState();
          gameStore.updateTeam('home', sharedState.home);
          gameStore.updateTeam('away', sharedState.away);
          gameStore.setPeriod(sharedState.period);
          gameStore.setTime(sharedState.timeRemaining);

          // Update penalties - clear and re-add
          // Note: This is simplified; a more robust solution would diff the arrays

          setViewerCount(sharedState.viewerCount);
          setSyncStatus('connected');
        } else {
          // Game was deleted
          setSyncStatus('disconnected');
          setSyncMode('local');
          setGameId(null);
          setError('Game ended by host');
        }
      });

      cleanupRef.current = cleanup;
      setGameId(upperGameId);
      setSyncMode('viewer');
      setSyncStatus('connected');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to join game';
      setError(message);
      setSyncStatus('error');
      throw err;
    }
  }, [isConfigured]);

  // Disconnect from game
  const disconnect = useCallback(async (): Promise<void> => {
    try {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (gameId && syncMode === 'host') {
        await leaveGame(gameId, true);
      }

      setSyncMode('local');
      setSyncStatus('disconnected');
      setGameId(null);
      setViewerCount(0);
      setError(null);
      debouncedUpdateRef.current = null;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to disconnect';
      setError(message);
    }
  }, [gameId, syncMode]);

  // Get shareable URL
  const getShareUrl = useCallback((): string => {
    if (!gameId) return '';
    return `${window.location.origin}?join=${gameId}`;
  }, [gameId]);

  // Sync state changes to Firebase when hosting
  useEffect(() => {
    if (syncMode !== 'host' || !gameId || !debouncedUpdateRef.current) {
      return;
    }

    debouncedUpdateRef.current({
      home: state.home,
      away: state.away,
      period: state.period,
      timeRemaining: state.timeRemaining,
      isOvertime: state.isOvertime,
      isRunning: state.isRunning,
      penalties: state.penalties,
      events: state.events,
    });
  }, [
    syncMode,
    gameId,
    state.home,
    state.away,
    state.period,
    state.timeRemaining,
    state.isOvertime,
    state.isRunning,
    state.penalties,
    state.events,
  ]);

  // Auto-join from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const joinId = params.get('join');
    if (joinId && syncMode === 'local') {
      joinGameById(joinId).catch(() => {
        // Error is already set in state
      });
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [joinGameById, syncMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return {
    syncMode,
    syncStatus,
    gameId,
    viewerCount,
    error,
    isConfigured,
    startHosting,
    joinGameById,
    disconnect,
    getShareUrl,
  };
}
