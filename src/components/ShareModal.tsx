import { useState } from 'react';
import { useGameSync } from '../hooks/useGameSync';

interface ShareModalProps {
  onClose: () => void;
}

export function ShareModal({ onClose }: ShareModalProps) {
  const {
    syncMode,
    syncStatus,
    gameId,
    viewerCount,
    error,
    isConfigured,
    startHosting,
    joinGameById,
    disconnect,
    getShareUrl,
  } = useGameSync();

  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleStartHosting = async () => {
    setIsLoading(true);
    try {
      await startHosting();
    } catch {
      // Error is set in hook
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) return;
    setIsLoading(true);
    try {
      await joinGameById(joinCode.trim());
    } catch {
      // Error is set in hook
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = async () => {
    if (gameId) {
      await navigator.clipboard.writeText(gameId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await disconnect();
    } catch {
      // Error is set in hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Live Sharing</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Configuration warning */}
        {!isConfigured && (
          <div className="mb-4 p-3 bg-yellow-900/50 border border-yellow-700 rounded-lg text-yellow-200 text-sm">
            <p className="font-semibold mb-1">Firebase not configured</p>
            <p className="text-xs text-yellow-300">
              To enable live sharing, add Firebase configuration to your environment variables.
              See <code className="bg-yellow-800/50 px-1 rounded">.env.example</code> for required keys.
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Status indicator */}
        <div className="mb-4 flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              syncStatus === 'connected'
                ? 'bg-green-500'
                : syncStatus === 'connecting'
                ? 'bg-yellow-500 animate-pulse'
                : syncStatus === 'error'
                ? 'bg-red-500'
                : 'bg-slate-500'
            }`}
          />
          <span className="text-sm text-slate-300 capitalize">
            {syncStatus === 'connected' && syncMode === 'host'
              ? `Hosting (${viewerCount} viewer${viewerCount !== 1 ? 's' : ''})`
              : syncStatus === 'connected' && syncMode === 'viewer'
              ? 'Viewing live game'
              : syncStatus}
          </span>
        </div>

        {/* Local mode - Show hosting/joining options */}
        {syncMode === 'local' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Host a Game
              </h3>
              <p className="text-sm text-slate-400 mb-3">
                Share your scoreboard live with unlimited viewers. They'll see all updates in real-time.
              </p>
              <button
                onClick={handleStartHosting}
                disabled={isLoading || !isConfigured}
                className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                    </svg>
                    Start Hosting
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-500">or</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Join a Game
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white uppercase tracking-widest text-center font-mono"
                />
                <button
                  onClick={handleJoin}
                  disabled={isLoading || !isConfigured || joinCode.length < 6}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Host mode - Show share options */}
        {syncMode === 'host' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Share Code
              </h3>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-slate-700 rounded-lg font-mono text-2xl tracking-widest text-center">
                  {gameId}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                  title="Copy code"
                >
                  {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Share Link
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={getShareUrl()}
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400 text-sm truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <button
                onClick={handleDisconnect}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
              >
                Stop Hosting
              </button>
            </div>
          </div>
        )}

        {/* Viewer mode - Show connection info */}
        {syncMode === 'viewer' && (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/50 rounded-full text-green-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Connected to game {gameId}
              </div>
            </div>

            <p className="text-sm text-slate-400 text-center">
              You're viewing this game live. The host controls the scoreboard.
            </p>

            <button
              onClick={handleDisconnect}
              disabled={isLoading}
              className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg font-medium transition-colors"
            >
              Leave Game
            </button>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
