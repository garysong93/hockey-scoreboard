import { useGameStore } from '../stores/gameStore';
import type { GameEvent } from '../types';

function formatEventTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function getEventIcon(type: GameEvent['type']) {
  switch (type) {
    case 'goal':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      );
    case 'penalty':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case 'period':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    case 'timeout':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    case 'shot':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
        </svg>
      );
  }
}

function getEventDescription(event: GameEvent, homeName: string, awayName: string): string {
  const teamName = event.team === 'home' ? homeName : awayName;

  switch (event.type) {
    case 'goal':
      return `${teamName} Goal`;
    case 'penalty':
      const penaltyType = event.details?.penaltyType || 'minor';
      const player = event.details?.playerNumber ? `#${event.details.playerNumber}` : '';
      const duration = event.details?.duration ? ` (${Math.floor(event.details.duration / 60)}:00)` : '';
      return `${teamName} ${player} ${penaltyType}${duration}`;
    case 'period':
      return event.details?.description || `Period ${event.period} Start`;
    case 'timeout':
      return `${teamName} Timeout`;
    case 'shot':
      return `${teamName} Shot`;
  }
}

interface GameHistoryProps {
  showShots?: boolean;
  maxEvents?: number;
}

export function GameHistory({ showShots = false, maxEvents = 20 }: GameHistoryProps) {
  const { events, home, away } = useGameStore();

  // Filter out shots if not showing them and reverse for most recent first
  const filteredEvents = events
    .filter(e => showShots || e.type !== 'shot')
    .slice(-maxEvents)
    .reverse();

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center text-slate-400 py-4">
        No events yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {filteredEvents.map((event) => (
        <div
          key={event.id}
          className="flex items-center gap-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: event.type === 'period'
                ? '#64748b'
                : event.team === 'home'
                  ? home.color
                  : away.color
            }}
          >
            {getEventIcon(event.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">
              {getEventDescription(event, home.abbreviation, away.abbreviation)}
            </div>
            <div className="text-xs text-slate-400">
              P{event.period} - {formatEventTime(event.gameTime)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
