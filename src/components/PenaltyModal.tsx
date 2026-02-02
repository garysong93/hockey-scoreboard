import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';

interface PenaltyModalProps {
  team: 'home' | 'away';
  onClose: () => void;
}

const PENALTY_TYPES = [
  { value: 'minor', label: 'Minor (2:00)', duration: 120 },
  { value: 'double-minor', label: 'Double Minor (4:00)', duration: 240 },
  { value: 'major', label: 'Major (5:00)', duration: 300 },
  { value: 'misconduct', label: 'Misconduct (10:00)', duration: 600 },
] as const;

export function PenaltyModal({ team, onClose }: PenaltyModalProps) {
  const [playerNumber, setPlayerNumber] = useState('');
  const [penaltyType, setPenaltyType] = useState<typeof PENALTY_TYPES[number]>(PENALTY_TYPES[0]);
  const { addPenalty } = useGameStore();
  const teamData = useGameStore((state) => state[team]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerNumber.trim()) return;

    addPenalty({
      team,
      playerNumber: playerNumber.trim(),
      duration: penaltyType.duration,
      type: penaltyType.value,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold" style={{ color: teamData.color }}>
            Add Penalty - {teamData.abbreviation}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Player Number
            </label>
            <input
              type="text"
              value={playerNumber}
              onChange={(e) => setPlayerNumber(e.target.value)}
              placeholder="e.g., 87"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Penalty Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PENALTY_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setPenaltyType(type)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    penaltyType.value === type.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!playerNumber.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
            >
              Add Penalty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
