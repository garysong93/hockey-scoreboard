import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GameStore, Team, Penalty, GameEvent, GameStateSnapshot } from '../types';

const createTeam = (name: string, abbr: string, color: string): Team => ({
  name,
  abbreviation: abbr,
  color,
  score: 0,
  shots: 0,
  timeouts: 1,
  timeoutsUsed: 0,
  emptyNet: false,
});

const DEFAULT_PERIOD_LENGTH = 20 * 60; // 20 minutes in seconds
const MAX_HISTORY_SIZE = 50; // Maximum number of undo states to keep

const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper to create a snapshot of current state for undo/redo
const createSnapshot = (state: {
  home: Team;
  away: Team;
  period: number;
  timeRemaining: number;
  isOvertime: boolean;
  penalties: Penalty[];
  events: GameEvent[];
}): GameStateSnapshot => ({
  home: { ...state.home },
  away: { ...state.away },
  period: state.period,
  timeRemaining: state.timeRemaining,
  isOvertime: state.isOvertime,
  penalties: [...state.penalties],
  events: [...state.events],
});

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      // Initial state
      home: createTeam('Home', 'HOME', '#ef4444'),
      away: createTeam('Away', 'AWAY', '#3b82f6'),

      period: 1,
      maxPeriods: 3,
      periodLength: DEFAULT_PERIOD_LENGTH,
      timeRemaining: DEFAULT_PERIOD_LENGTH,
      isRunning: false,
      isOvertime: false,
      isIntermission: false,

      penalties: [],

      events: [],
      historyStack: [],
      historyIndex: -1,

      theme: 'dark',
      soundEnabled: true,
      showShots: true,
      showPenalties: true,

      // Score actions
      addGoal: (team) => {
        const state = get();
        const snapshot = createSnapshot(state);
        const event: GameEvent = {
          id: generateId(),
          type: 'goal',
          team,
          timestamp: Date.now(),
          period: state.period,
          gameTime: state.timeRemaining,
        };
        set({
          [team]: {
            ...state[team],
            score: state[team].score + 1,
          },
          events: [...state.events, event],
          historyStack: [...state.historyStack.slice(0, state.historyIndex + 1), snapshot].slice(-MAX_HISTORY_SIZE),
          historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY_SIZE - 1),
        });
      },

      removeGoal: (team) => {
        const state = get();
        if (state[team].score <= 0) return;
        const snapshot = createSnapshot(state);
        set({
          [team]: {
            ...state[team],
            score: Math.max(0, state[team].score - 1),
          },
          historyStack: [...state.historyStack.slice(0, state.historyIndex + 1), snapshot].slice(-MAX_HISTORY_SIZE),
          historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY_SIZE - 1),
        });
      },

      // Shots actions
      addShot: (team) => {
        const state = get();
        const event: GameEvent = {
          id: generateId(),
          type: 'shot',
          team,
          timestamp: Date.now(),
          period: state.period,
          gameTime: state.timeRemaining,
        };
        set({
          [team]: {
            ...state[team],
            shots: state[team].shots + 1,
          },
          events: [...state.events, event],
        });
      },

      removeShot: (team) => {
        set((state) => ({
          [team]: {
            ...state[team],
            shots: Math.max(0, state[team].shots - 1),
          },
        }));
      },

      // Timer actions
      startTimer: () => set({ isRunning: true }),
      stopTimer: () => set({ isRunning: false }),
      toggleTimer: () => set((state) => ({ isRunning: !state.isRunning })),

      setTime: (seconds) => set({ timeRemaining: Math.max(0, seconds) }),

      adjustTime: (delta) => {
        set((state) => ({
          timeRemaining: Math.max(0, state.timeRemaining + delta),
        }));
      },

      // Period actions
      nextPeriod: () => {
        const state = get();
        if (state.period < state.maxPeriods) {
          const event: GameEvent = {
            id: generateId(),
            type: 'period',
            team: 'home', // Period events are neutral, using home as default
            timestamp: Date.now(),
            period: state.period + 1,
            gameTime: state.periodLength,
          };
          set({
            period: state.period + 1,
            timeRemaining: state.periodLength,
            isRunning: false,
            isOvertime: false,
            events: [...state.events, event],
          });
        } else if (state.home.score === state.away.score) {
          // Go to overtime if tied
          const event: GameEvent = {
            id: generateId(),
            type: 'period',
            team: 'home',
            timestamp: Date.now(),
            period: state.period + 1,
            gameTime: 5 * 60,
            details: { description: 'Overtime' },
          };
          set({
            period: state.period + 1,
            timeRemaining: 5 * 60, // 5 minute overtime
            isRunning: false,
            isOvertime: true,
            events: [...state.events, event],
          });
        }
      },

      prevPeriod: () => {
        set((state) => ({
          period: Math.max(1, state.period - 1),
          isOvertime: false,
        }));
      },

      setPeriod: (period) => {
        set((state) => ({
          period: Math.max(1, Math.min(period, state.maxPeriods + 1)),
          isOvertime: period > state.maxPeriods,
        }));
      },

      // Penalty actions
      addPenalty: (penalty) => {
        const state = get();
        const snapshot = createSnapshot(state);
        const newPenalty: Penalty = {
          ...penalty,
          id: generateId(),
          timeRemaining: penalty.duration,
        };
        const event: GameEvent = {
          id: generateId(),
          type: 'penalty',
          team: penalty.team,
          timestamp: Date.now(),
          period: state.period,
          gameTime: state.timeRemaining,
          details: {
            playerNumber: penalty.playerNumber,
            penaltyType: penalty.type,
            duration: penalty.duration,
            description: penalty.description,
          },
        };
        set({
          penalties: [...state.penalties, newPenalty],
          events: [...state.events, event],
          historyStack: [...state.historyStack.slice(0, state.historyIndex + 1), snapshot].slice(-MAX_HISTORY_SIZE),
          historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY_SIZE - 1),
        });
      },

      removePenalty: (id) => {
        const state = get();
        const snapshot = createSnapshot(state);
        set({
          penalties: state.penalties.filter((p) => p.id !== id),
          historyStack: [...state.historyStack.slice(0, state.historyIndex + 1), snapshot].slice(-MAX_HISTORY_SIZE),
          historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY_SIZE - 1),
        });
      },

      clearPenalties: (team) => {
        set((state) => ({
          penalties: team
            ? state.penalties.filter((p) => p.team !== team)
            : [],
        }));
      },

      tickPenalties: () => {
        set((state) => ({
          penalties: state.penalties
            .map((p) => ({
              ...p,
              timeRemaining: Math.max(0, p.timeRemaining - 1),
            }))
            .filter((p) => p.timeRemaining > 0),
        }));
      },

      // Team settings
      updateTeam: (team, updates) => {
        set((state) => ({
          [team]: {
            ...state[team],
            ...updates,
          },
        }));
      },

      toggleEmptyNet: (team) => {
        set((state) => ({
          [team]: {
            ...state[team],
            emptyNet: !state[team].emptyNet,
          },
        }));
      },

      useTimeout: (team) => {
        const state = get();
        if (state[team].timeoutsUsed < state[team].timeouts) {
          const event: GameEvent = {
            id: generateId(),
            type: 'timeout',
            team,
            timestamp: Date.now(),
            period: state.period,
            gameTime: state.timeRemaining,
          };
          set({
            [team]: {
              ...state[team],
              timeoutsUsed: state[team].timeoutsUsed + 1,
            },
            isRunning: false,
            events: [...state.events, event],
          });
        }
      },

      // Game actions
      newGame: () => {
        set({
          home: createTeam('Home', 'HOME', '#ef4444'),
          away: createTeam('Away', 'AWAY', '#3b82f6'),
          period: 1,
          timeRemaining: get().periodLength,
          isRunning: false,
          isOvertime: false,
          isIntermission: false,
          penalties: [],
          events: [],
          historyStack: [],
          historyIndex: -1,
        });
      },

      resetScores: () => {
        set((state) => ({
          home: { ...state.home, score: 0, shots: 0, timeoutsUsed: 0, emptyNet: false },
          away: { ...state.away, score: 0, shots: 0, timeoutsUsed: 0, emptyNet: false },
          penalties: [],
        }));
      },

      // Settings
      setTheme: (theme) => set({ theme }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      setSettings: (settings) => {
        set((state) => ({
          ...settings,
          timeRemaining: settings.periodLength ?? state.timeRemaining,
        }));
      },

      // History actions
      undo: () => {
        const state = get();
        if (state.historyIndex < 0) return;

        const snapshot = state.historyStack[state.historyIndex];
        if (!snapshot) return;

        // Save current state to allow redo
        const currentSnapshot = createSnapshot(state);
        const newStack = [...state.historyStack];
        newStack[state.historyIndex] = currentSnapshot;

        set({
          home: { ...snapshot.home },
          away: { ...snapshot.away },
          period: snapshot.period,
          timeRemaining: snapshot.timeRemaining,
          isOvertime: snapshot.isOvertime,
          penalties: [...snapshot.penalties],
          events: [...snapshot.events],
          historyStack: newStack,
          historyIndex: state.historyIndex - 1,
        });
      },

      redo: () => {
        const state = get();
        if (state.historyIndex >= state.historyStack.length - 1) return;

        const nextIndex = state.historyIndex + 1;
        const snapshot = state.historyStack[nextIndex];
        if (!snapshot) return;

        // Save current state before moving forward
        const currentSnapshot = createSnapshot(state);
        const newStack = [...state.historyStack];
        if (state.historyIndex >= 0) {
          newStack[state.historyIndex] = currentSnapshot;
        }

        set({
          home: { ...snapshot.home },
          away: { ...snapshot.away },
          period: snapshot.period,
          timeRemaining: snapshot.timeRemaining,
          isOvertime: snapshot.isOvertime,
          penalties: [...snapshot.penalties],
          events: [...snapshot.events],
          historyStack: newStack,
          historyIndex: nextIndex,
        });
      },

      canUndo: () => {
        const state = get();
        return state.historyIndex >= 0;
      },

      canRedo: () => {
        const state = get();
        return state.historyIndex < state.historyStack.length - 1;
      },

      clearHistory: () => {
        set({
          events: [],
          historyStack: [],
          historyIndex: -1,
        });
      },
    }),
    {
      name: 'hockey-scoreboard-storage',
      partialize: (state) => ({
        home: state.home,
        away: state.away,
        period: state.period,
        maxPeriods: state.maxPeriods,
        periodLength: state.periodLength,
        timeRemaining: state.timeRemaining,
        isOvertime: state.isOvertime,
        penalties: state.penalties,
        theme: state.theme,
        soundEnabled: state.soundEnabled,
        showShots: state.showShots,
        showPenalties: state.showPenalties,
        events: state.events,
        historyStack: state.historyStack,
        historyIndex: state.historyIndex,
      }),
    }
  )
);
