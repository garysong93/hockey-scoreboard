import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { nhlTeams, teamsByDivision, type NHLTeam } from '../data/nhlTeams';

interface TeamPresetModalProps {
  team: 'home' | 'away';
  onClose: () => void;
}

export function TeamPresetModal({ team, onClose }: TeamPresetModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const { updateTeam } = useGameStore();

  const handleSelectTeam = (nhlTeam: NHLTeam) => {
    updateTeam(team, {
      name: `${nhlTeam.city} ${nhlTeam.name}`,
      abbreviation: nhlTeam.abbreviation,
      color: nhlTeam.primaryColor,
    });
    onClose();
  };

  // Filter teams based on search query
  const filteredTeams = searchQuery
    ? nhlTeams.filter(
        t =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : selectedDivision
    ? teamsByDivision[selectedDivision as keyof typeof teamsByDivision]
    : nhlTeams;

  const divisions = ['Metropolitan', 'Atlantic', 'Central', 'Pacific'] as const;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">
              Select {team === 'home' ? 'Home' : 'Away'} Team
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value) setSelectedDivision(null);
            }}
            className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Division filters */}
          {!searchQuery && (
            <div className="flex gap-2 mt-3 flex-wrap">
              <button
                onClick={() => setSelectedDivision(null)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedDivision === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
              >
                All
              </button>
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedDivision === div
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Team grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredTeams.map((nhlTeam) => (
              <button
                key={nhlTeam.abbreviation}
                onClick={() => handleSelectTeam(nhlTeam)}
                className="p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors text-left group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{ backgroundColor: nhlTeam.primaryColor }}
                  />
                  <span className="font-bold text-sm">{nhlTeam.abbreviation}</span>
                </div>
                <div className="text-xs text-slate-400 truncate">
                  {nhlTeam.city} {nhlTeam.name}
                </div>
              </button>
            ))}
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              No teams found matching "{searchQuery}"
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
