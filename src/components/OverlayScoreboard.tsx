import { useGameStore } from '../stores/gameStore';
import { formatTime } from '../hooks/useTimer';

interface OverlayScoreboardProps {
  showPenalties?: boolean;
  theme?: 'minimal' | 'full';
  position?: 'top' | 'bottom';
}

export function OverlayScoreboard({
  showPenalties = true,
  theme = 'minimal',
  position = 'top',
}: OverlayScoreboardProps) {
  const { home, away, period, timeRemaining, isOvertime, penalties, isRunning } =
    useGameStore();

  const homePenalties = penalties.filter((p) => p.team === 'home');
  const awayPenalties = penalties.filter((p) => p.team === 'away');
  const homePP = awayPenalties.length > homePenalties.length;
  const awayPP = homePenalties.length > awayPenalties.length;

  const periodDisplay = isOvertime ? 'OT' : `P${period}`;

  if (theme === 'minimal') {
    return (
      <div
        className={`fixed ${position === 'top' ? 'top-4' : 'bottom-4'} left-4 z-50`}
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <div className="flex items-stretch bg-black/80 rounded-lg overflow-hidden shadow-lg backdrop-blur-sm">
          {/* Home Team */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ backgroundColor: `${home.color}dd` }}
          >
            <span className="font-bold text-white text-sm">{home.abbreviation}</span>
            {homePP && (
              <span className="text-xs bg-yellow-400 text-black px-1 rounded font-bold">PP</span>
            )}
            <span className="font-bold text-white text-2xl tabular-nums">{home.score}</span>
          </div>

          {/* Center - Time */}
          <div className="flex flex-col items-center justify-center px-3 py-1 bg-slate-900/90 min-w-[70px]">
            <span className="text-slate-400 text-xs font-medium">{periodDisplay}</span>
            <span
              className={`font-mono text-lg tabular-nums ${
                timeRemaining < 60 ? 'text-red-400' : 'text-white'
              } ${isRunning ? '' : 'opacity-80'}`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Away Team */}
          <div
            className="flex items-center gap-2 px-3 py-2"
            style={{ backgroundColor: `${away.color}dd` }}
          >
            <span className="font-bold text-white text-2xl tabular-nums">{away.score}</span>
            {awayPP && (
              <span className="text-xs bg-yellow-400 text-black px-1 rounded font-bold">PP</span>
            )}
            <span className="font-bold text-white text-sm">{away.abbreviation}</span>
          </div>
        </div>

        {/* Penalties indicator */}
        {showPenalties && penalties.length > 0 && (
          <div className="mt-1 flex gap-1">
            {homePenalties.slice(0, 2).map((p) => (
              <div
                key={p.id}
                className="text-xs bg-red-600/90 text-white px-2 py-0.5 rounded"
              >
                #{p.playerNumber} {Math.floor(p.timeRemaining / 60)}:
                {(p.timeRemaining % 60).toString().padStart(2, '0')}
              </div>
            ))}
            {awayPenalties.slice(0, 2).map((p) => (
              <div
                key={p.id}
                className="text-xs bg-red-600/90 text-white px-2 py-0.5 rounded"
              >
                #{p.playerNumber} {Math.floor(p.timeRemaining / 60)}:
                {(p.timeRemaining % 60).toString().padStart(2, '0')}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Full theme - more detailed display
  return (
    <div
      className={`fixed ${position === 'top' ? 'top-4' : 'bottom-4'} left-1/2 -translate-x-1/2 z-50`}
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <div className="bg-black/85 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10">
        <div className="flex items-stretch">
          {/* Home Team */}
          <div className="flex flex-col items-center p-3 min-w-[100px]">
            <div
              className="w-10 h-10 rounded-full mb-1"
              style={{ backgroundColor: home.color }}
            />
            <span className="font-bold text-white text-sm">{home.abbreviation}</span>
            {homePP && (
              <span className="text-xs bg-yellow-400 text-black px-1.5 py-0.5 rounded font-bold mt-1">
                POWER PLAY
              </span>
            )}
            <span className="font-bold text-white text-4xl mt-1 tabular-nums">{home.score}</span>
          </div>

          {/* Center - Time & Period */}
          <div className="flex flex-col items-center justify-center px-6 py-3 bg-slate-900/50 min-w-[120px]">
            <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
              {periodDisplay}
            </span>
            <span
              className={`font-mono text-3xl tabular-nums mt-1 ${
                timeRemaining < 60 ? 'text-red-400' : 'text-white'
              }`}
            >
              {formatTime(timeRemaining)}
            </span>
            {!isRunning && (
              <span className="text-yellow-400 text-xs mt-1 uppercase">Stopped</span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center p-3 min-w-[100px]">
            <div
              className="w-10 h-10 rounded-full mb-1"
              style={{ backgroundColor: away.color }}
            />
            <span className="font-bold text-white text-sm">{away.abbreviation}</span>
            {awayPP && (
              <span className="text-xs bg-yellow-400 text-black px-1.5 py-0.5 rounded font-bold mt-1">
                POWER PLAY
              </span>
            )}
            <span className="font-bold text-white text-4xl mt-1 tabular-nums">{away.score}</span>
          </div>
        </div>

        {/* Penalties bar */}
        {showPenalties && penalties.length > 0 && (
          <div className="flex justify-between px-3 py-2 bg-red-900/50 border-t border-red-700/50">
            <div className="flex gap-2">
              {homePenalties.slice(0, 2).map((p) => (
                <span key={p.id} className="text-xs text-white">
                  #{p.playerNumber} ({Math.floor(p.timeRemaining / 60)}:
                  {(p.timeRemaining % 60).toString().padStart(2, '0')})
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {awayPenalties.slice(0, 2).map((p) => (
                <span key={p.id} className="text-xs text-white">
                  #{p.playerNumber} ({Math.floor(p.timeRemaining / 60)}:
                  {(p.timeRemaining % 60).toString().padStart(2, '0')})
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
