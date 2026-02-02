import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';

interface TeamPanelProps {
  team: 'home' | 'away';
  isPowerPlay: boolean;
}

export function TeamPanel({ team, isPowerPlay }: TeamPanelProps) {
  const teamData = useGameStore((state) => state[team]);
  const { addGoal, removeGoal, addShot, removeShot, showShots } = useGameStore();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddGoal = () => {
    addGoal(team);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const isHome = team === 'home';

  return (
    <div
      className={`p-4 sm:p-6 flex flex-col items-center ${
        isHome ? 'bg-gradient-to-br from-red-900/30 to-transparent' : 'bg-gradient-to-bl from-blue-900/30 to-transparent'
      }`}
    >
      {/* Team Name */}
      <div className="flex items-center gap-2 mb-2">
        <span
          className="text-lg sm:text-xl font-bold uppercase tracking-wider"
          style={{ color: teamData.color }}
        >
          {teamData.abbreviation}
        </span>
        {isPowerPlay && (
          <span className="px-2 py-0.5 bg-yellow-500 text-black text-xs font-bold rounded animate-pulse">
            PP
          </span>
        )}
        {teamData.emptyNet && (
          <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded">
            EN
          </span>
        )}
      </div>

      {/* Score */}
      <button
        onClick={handleAddGoal}
        onContextMenu={(e) => {
          e.preventDefault();
          removeGoal(team);
        }}
        className={`
          score-display text-6xl sm:text-8xl font-black
          min-w-[100px] sm:min-w-[140px] py-2
          transition-transform duration-150 active:scale-95
          hover:text-white/90 cursor-pointer no-select
          ${isAnimating ? 'animate-pulse-score' : ''}
        `}
        style={{ color: teamData.color }}
        title="Click to add goal, right-click to remove"
      >
        {teamData.score}
      </button>

      {/* Shots on Goal */}
      {showShots && (
        <div className="mt-2 flex items-center gap-2 text-slate-400">
          <span className="text-xs uppercase tracking-wider">SOG</span>
          <button
            onClick={() => addShot(team)}
            onContextMenu={(e) => {
              e.preventDefault();
              removeShot(team);
            }}
            className="text-lg font-bold hover:text-white transition-colors cursor-pointer no-select"
            title="Click to add shot, right-click to remove"
          >
            {teamData.shots}
          </button>
        </div>
      )}
    </div>
  );
}
