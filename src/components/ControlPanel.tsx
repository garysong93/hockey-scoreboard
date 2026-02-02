import { useState } from 'react';
import { useGameStore } from '../stores/gameStore';
import { PenaltyModal } from './PenaltyModal';
import { SettingsModal } from './SettingsModal';
import { GameHistory } from './GameHistory';
import { ExportModal } from './ExportModal';
import { ShareModal } from './ShareModal';
import { VoiceControlButton } from './VoiceControlButton';

export function ControlPanel() {
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [penaltyTeam, setPenaltyTeam] = useState<'home' | 'away'>('home');

  const { newGame, toggleEmptyNet, useTimeout, home, away, undo, redo, canUndo, canRedo } = useGameStore();

  const handleAddPenalty = (team: 'home' | 'away') => {
    setPenaltyTeam(team);
    setShowPenaltyModal(true);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-slate-800/50 rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Home Controls */}
            <div className="space-y-2">
              <div
                className="text-sm font-semibold uppercase tracking-wider text-center mb-2"
                style={{ color: home.color }}
              >
                {home.abbreviation}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddPenalty('home')}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                >
                  + Penalty
                </button>
                <button
                  onClick={() => toggleEmptyNet('home')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    home.emptyNet
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Empty Net
                </button>
                <button
                  onClick={() => useTimeout('home')}
                  disabled={home.timeoutsUsed >= home.timeouts}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors col-span-2"
                >
                  Timeout ({home.timeouts - home.timeoutsUsed} left)
                </button>
              </div>
            </div>

            {/* Away Controls */}
            <div className="space-y-2">
              <div
                className="text-sm font-semibold uppercase tracking-wider text-center mb-2"
                style={{ color: away.color }}
              >
                {away.abbreviation}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAddPenalty('away')}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                >
                  + Penalty
                </button>
                <button
                  onClick={() => toggleEmptyNet('away')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    away.emptyNet
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                >
                  Empty Net
                </button>
                <button
                  onClick={() => useTimeout('away')}
                  disabled={away.timeoutsUsed >= away.timeouts}
                  className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors col-span-2"
                >
                  Timeout ({away.timeouts - away.timeoutsUsed} left)
                </button>
              </div>
            </div>
          </div>

          {/* Undo/Redo/Voice Controls */}
          <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-slate-700 flex-wrap">
            <button
              onClick={undo}
              disabled={!canUndo()}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
              title="Undo (Ctrl+Z)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a2 2 0 012 2v4a1 1 0 11-2 0v-4H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Undo
            </button>
            <button
              onClick={redo}
              disabled={!canRedo()}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
              title="Redo (Ctrl+Y)"
            >
              Redo
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a2 2 0 01-2-2V5a1 1 0 012 0v4h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                showHistory ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              History
            </button>
            <VoiceControlButton />
          </div>

          {/* Game History Panel */}
          {showHistory && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Game Events
              </h3>
              <div className="max-h-64 overflow-y-auto">
                <GameHistory maxEvents={50} />
              </div>
            </div>
          )}

          {/* Game Controls */}
          <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-slate-700 flex-wrap">
            <button
              onClick={() => setShowSettingsModal(true)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Settings
            </button>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
            <button
              onClick={() => {
                if (confirm('Start a new game? This will reset all scores and penalties.')) {
                  newGame();
                }
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition-colors"
            >
              New Game
            </button>
          </div>
        </div>
      </div>

      {showPenaltyModal && (
        <PenaltyModal
          team={penaltyTeam}
          onClose={() => setShowPenaltyModal(false)}
        />
      )}

      {showSettingsModal && (
        <SettingsModal onClose={() => setShowSettingsModal(false)} />
      )}

      {showExportModal && (
        <ExportModal onClose={() => setShowExportModal(false)} />
      )}

      {showShareModal && (
        <ShareModal onClose={() => setShowShareModal(false)} />
      )}
    </>
  );
}
