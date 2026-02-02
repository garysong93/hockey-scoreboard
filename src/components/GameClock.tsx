import { useGameStore } from '../stores/gameStore';
import { useTimer, formatTime } from '../hooks/useTimer';

export function GameClock() {
  const { period, maxPeriods, isOvertime, isRunning, toggleTimer, nextPeriod, adjustTime } = useGameStore();
  useTimer();
  const timeRemaining = useGameStore((state) => state.timeRemaining);

  const periodLabel = isOvertime ? 'OT' : period > maxPeriods ? `OT${period - maxPeriods}` : period;

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-4 bg-slate-900/50 border-x border-slate-700">
      {/* Period */}
      <button
        onClick={nextPeriod}
        className="text-xs sm:text-sm uppercase tracking-wider text-slate-400 hover:text-white transition-colors mb-1"
        title="Click to advance period"
      >
        {isOvertime ? 'Overtime' : `Period ${periodLabel}`}
      </button>

      {/* Timer */}
      <button
        onClick={toggleTimer}
        className={`
          timer-display text-4xl sm:text-5xl font-bold
          transition-all duration-150 cursor-pointer no-select
          ${isRunning ? 'text-green-400' : 'text-white'}
          ${timeRemaining <= 60 && timeRemaining > 0 ? 'text-red-400 animate-pulse' : ''}
          ${timeRemaining === 0 ? 'text-red-500 animate-blink' : ''}
          hover:opacity-80
        `}
        title={isRunning ? 'Click to stop' : 'Click to start'}
      >
        {formatTime(timeRemaining, timeRemaining < 60)}
      </button>

      {/* Quick time adjust buttons */}
      <div className="flex gap-1 mt-2">
        <button
          onClick={() => adjustTime(-10)}
          className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          title="Subtract 10 seconds"
        >
          -10s
        </button>
        <button
          onClick={() => adjustTime(10)}
          className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors"
          title="Add 10 seconds"
        >
          +10s
        </button>
      </div>
    </div>
  );
}
