import { useGameStore } from '../stores/gameStore';
import { TeamPanel } from './TeamPanel';
import { GameClock } from './GameClock';
import { PenaltyBox } from './PenaltyBox';

export function Scoreboard() {
  const { showPenalties, penalties } = useGameStore();

  const homePenalties = penalties.filter((p) => p.team === 'home');
  const awayPenalties = penalties.filter((p) => p.team === 'away');

  // Determine power play status
  const homePowerPlay = awayPenalties.length > homePenalties.length;
  const awayPowerPlay = homePenalties.length > awayPenalties.length;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Main Scoreboard */}
      <div id="scoreboard" className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden">
        {/* Teams and Score */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-stretch">
          {/* Home Team */}
          <TeamPanel
            team="home"
            isPowerPlay={homePowerPlay}
          />

          {/* Center - Clock and Period */}
          <GameClock />

          {/* Away Team */}
          <TeamPanel
            team="away"
            isPowerPlay={awayPowerPlay}
          />
        </div>

        {/* Penalty Boxes */}
        {showPenalties && penalties.length > 0 && (
          <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/50 border-t border-slate-700">
            <PenaltyBox team="home" penalties={homePenalties} />
            <PenaltyBox team="away" penalties={awayPenalties} />
          </div>
        )}
      </div>
    </div>
  );
}
