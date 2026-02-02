export interface Team {
  name: string;
  abbreviation: string;
  color: string;
  score: number;
  shots: number;
  timeouts: number;
  timeoutsUsed: number;
  emptyNet: boolean;
}

export interface GameEvent {
  id: string;
  type: 'goal' | 'penalty' | 'period' | 'timeout' | 'shot';
  team: 'home' | 'away';
  timestamp: number; // Unix timestamp
  period: number;
  gameTime: number; // Time remaining when event occurred
  details?: {
    playerNumber?: string;
    penaltyType?: string;
    duration?: number;
    description?: string;
  };
}

export interface Penalty {
  id: string;
  team: 'home' | 'away';
  playerNumber: string;
  duration: number; // in seconds (120 for minor, 300 for major)
  timeRemaining: number; // in seconds
  type: 'minor' | 'major' | 'misconduct' | 'double-minor';
  description?: string;
}

export interface GameState {
  // Teams
  home: Team;
  away: Team;

  // Game clock
  period: number;
  maxPeriods: number;
  periodLength: number; // in seconds (default 1200 = 20 minutes)
  timeRemaining: number; // in seconds
  isRunning: boolean;
  isOvertime: boolean;
  isIntermission: boolean;

  // Penalties
  penalties: Penalty[];

  // Settings
  theme: 'dark' | 'light';
  soundEnabled: boolean;
  showShots: boolean;
  showPenalties: boolean;

  // Game History
  events: GameEvent[];
  historyStack: GameStateSnapshot[];
  historyIndex: number;
}

export interface GameStateSnapshot {
  home: Team;
  away: Team;
  period: number;
  timeRemaining: number;
  isOvertime: boolean;
  penalties: Penalty[];
  events: GameEvent[];
}

export interface GameActions {
  // Score
  addGoal: (team: 'home' | 'away') => void;
  removeGoal: (team: 'home' | 'away') => void;

  // Shots
  addShot: (team: 'home' | 'away') => void;
  removeShot: (team: 'home' | 'away') => void;

  // Timer
  startTimer: () => void;
  stopTimer: () => void;
  toggleTimer: () => void;
  setTime: (seconds: number) => void;
  adjustTime: (delta: number) => void;

  // Period
  nextPeriod: () => void;
  prevPeriod: () => void;
  setPeriod: (period: number) => void;

  // Penalties
  addPenalty: (penalty: Omit<Penalty, 'id' | 'timeRemaining'>) => void;
  removePenalty: (id: string) => void;
  clearPenalties: (team?: 'home' | 'away') => void;
  tickPenalties: () => void;

  // Team settings
  updateTeam: (team: 'home' | 'away', updates: Partial<Team>) => void;
  toggleEmptyNet: (team: 'home' | 'away') => void;
  useTimeout: (team: 'home' | 'away') => void;

  // Game
  newGame: () => void;
  resetScores: () => void;

  // Settings
  setTheme: (theme: 'dark' | 'light') => void;
  toggleSound: () => void;
  setSettings: (settings: Partial<Pick<GameState, 'periodLength' | 'maxPeriods' | 'showShots' | 'showPenalties'>>) => void;

  // History
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  clearHistory: () => void;
}

export type GameStore = GameState & GameActions;
