import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { TeamPresetModal } from './TeamPresetModal';

interface SettingsModalProps {
  onClose: () => void;
}

export function SettingsModal({ onClose }: SettingsModalProps) {
  const {
    home,
    away,
    periodLength,
    maxPeriods,
    showShots,
    showPenalties,
    theme,
    updateTeam,
    setSettings,
    setTheme,
    setTime,
  } = useGameStore();

  const [homeSettings, setHomeSettings] = useState({
    name: home.name,
    abbreviation: home.abbreviation,
    color: home.color,
  });

  const [awaySettings, setAwaySettings] = useState({
    name: away.name,
    abbreviation: away.abbreviation,
    color: away.color,
  });

  const [gameSettings, setGameSettings] = useState({
    periodLength: periodLength / 60, // Convert to minutes
    maxPeriods,
    showShots,
    showPenalties,
  });

  const [presetTeam, setPresetTeam] = useState<'home' | 'away' | null>(null);

  const handleSave = () => {
    updateTeam('home', homeSettings);
    updateTeam('away', awaySettings);
    setSettings({
      periodLength: gameSettings.periodLength * 60,
      maxPeriods: gameSettings.maxPeriods,
      showShots: gameSettings.showShots,
      showPenalties: gameSettings.showPenalties,
    });
    setTime(gameSettings.periodLength * 60);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-lg my-8 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Home Team Settings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Home Team
              </h3>
              <button
                onClick={() => setPresetTeam('home')}
                className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
              >
                NHL Teams
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  value={homeSettings.name}
                  onChange={(e) => setHomeSettings({ ...homeSettings, name: e.target.value })}
                  placeholder="Team Name"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={homeSettings.abbreviation}
                  onChange={(e) => setHomeSettings({ ...homeSettings, abbreviation: e.target.value.toUpperCase().slice(0, 4) })}
                  placeholder="ABBR"
                  maxLength={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm uppercase"
                />
              </div>
              <div className="col-span-3">
                <label className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Color:</span>
                  <input
                    type="color"
                    value={homeSettings.color}
                    onChange={(e) => setHomeSettings({ ...homeSettings, color: e.target.value })}
                    className="w-12 h-8 rounded cursor-pointer bg-transparent"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Away Team Settings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                Away Team
              </h3>
              <button
                onClick={() => setPresetTeam('away')}
                className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
              >
                NHL Teams
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <input
                  type="text"
                  value={awaySettings.name}
                  onChange={(e) => setAwaySettings({ ...awaySettings, name: e.target.value })}
                  placeholder="Team Name"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                />
              </div>
              <div>
                <input
                  type="text"
                  value={awaySettings.abbreviation}
                  onChange={(e) => setAwaySettings({ ...awaySettings, abbreviation: e.target.value.toUpperCase().slice(0, 4) })}
                  placeholder="ABBR"
                  maxLength={4}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm uppercase"
                />
              </div>
              <div className="col-span-3">
                <label className="flex items-center gap-2">
                  <span className="text-sm text-slate-400">Color:</span>
                  <input
                    type="color"
                    value={awaySettings.color}
                    onChange={(e) => setAwaySettings({ ...awaySettings, color: e.target.value })}
                    className="w-12 h-8 rounded cursor-pointer bg-transparent"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Game Settings */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Game Settings
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Period Length (min)</label>
                  <input
                    type="number"
                    value={gameSettings.periodLength}
                    onChange={(e) => setGameSettings({ ...gameSettings, periodLength: parseInt(e.target.value) || 20 })}
                    min={1}
                    max={60}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Periods</label>
                  <select
                    value={gameSettings.maxPeriods}
                    onChange={(e) => setGameSettings({ ...gameSettings, maxPeriods: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white text-sm"
                  >
                    <option value={2}>2 Periods</option>
                    <option value={3}>3 Periods</option>
                    <option value={4}>4 Periods</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.showShots}
                    onChange={(e) => setGameSettings({ ...gameSettings, showShots: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
                  />
                  <span className="text-sm text-slate-300">Show Shots on Goal</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={gameSettings.showPenalties}
                    onChange={(e) => setGameSettings({ ...gameSettings, showPenalties: e.target.checked })}
                    className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-slate-800"
                  />
                  <span className="text-sm text-slate-300">Show Penalty Box</span>
                </label>
              </div>
            </div>
          </div>

          {/* Theme */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Theme
            </h3>
            <div className="flex gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
              >
                Light
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>

      {presetTeam && (
        <TeamPresetModal
          team={presetTeam}
          onClose={() => {
            setPresetTeam(null);
            // Refresh local state from store after preset selection
            const state = useGameStore.getState();
            if (presetTeam === 'home') {
              setHomeSettings({
                name: state.home.name,
                abbreviation: state.home.abbreviation,
                color: state.home.color,
              });
            } else {
              setAwaySettings({
                name: state.away.name,
                abbreviation: state.away.abbreviation,
                color: state.away.color,
              });
            }
          }}
        />
      )}
    </div>
  );
}
