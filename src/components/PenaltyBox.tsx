import { useGameStore } from '../stores/gameStore';
import { formatPenaltyTime } from '../hooks/useTimer';
import type { Penalty } from '../types';

interface PenaltyBoxProps {
  team: 'home' | 'away';
  penalties: Penalty[];
}

export function PenaltyBox({ team, penalties }: PenaltyBoxProps) {
  const { removePenalty } = useGameStore();
  const teamData = useGameStore((state) => state[team]);

  if (penalties.length === 0) {
    return <div className="text-center text-slate-500 text-sm">No penalties</div>;
  }

  return (
    <div className="space-y-2">
      <div
        className="text-xs uppercase tracking-wider font-semibold text-center mb-2"
        style={{ color: teamData.color }}
      >
        {teamData.abbreviation} Penalties
      </div>
      {penalties.slice(0, 3).map((penalty) => (
        <div
          key={penalty.id}
          className="flex items-center justify-between bg-slate-800/50 rounded px-3 py-2 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">#{penalty.playerNumber}</span>
            <span className="text-slate-400 text-xs uppercase">
              {penalty.type === 'double-minor' ? '2x2' : penalty.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`penalty-timer font-mono font-bold ${
                penalty.timeRemaining <= 30 ? 'text-yellow-400' : 'text-white'
              }`}
            >
              {formatPenaltyTime(penalty.timeRemaining)}
            </span>
            <button
              onClick={() => removePenalty(penalty.id)}
              className="text-slate-500 hover:text-red-400 transition-colors"
              title="Remove penalty"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      {penalties.length > 3 && (
        <div className="text-center text-slate-500 text-xs">
          +{penalties.length - 3} more
        </div>
      )}
    </div>
  );
}
