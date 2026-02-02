import { useState } from 'react';
import { useVoiceControl } from '../hooks/useVoiceControl';
import { voiceCommandHelp } from '../utils/voiceCommands';

export function VoiceControlButton() {
  const {
    isListening,
    isSupported,
    transcript,
    lastCommand,
    error,
    toggleListening,
  } = useVoiceControl();

  const [showHelp, setShowHelp] = useState(false);

  if (!isSupported) {
    return (
      <button
        disabled
        className="px-3 py-2 bg-slate-700 opacity-50 cursor-not-allowed rounded-lg text-sm font-medium flex items-center gap-2"
        title="Voice control not supported in this browser"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
        </svg>
        Voice
      </button>
    );
  }

  return (
    <div className="relative">
      <div className="flex gap-1">
        <button
          onClick={toggleListening}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
            isListening
              ? 'bg-red-600 hover:bg-red-500 animate-pulse'
              : 'bg-slate-700 hover:bg-slate-600'
          }`}
          title={isListening ? 'Stop voice control' : 'Start voice control'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${isListening ? 'animate-pulse' : ''}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clipRule="evenodd"
            />
          </svg>
          {isListening ? 'Listening...' : 'Voice'}
        </button>

        <button
          onClick={() => setShowHelp(!showHelp)}
          className="px-2 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
          title="Voice command help"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Feedback overlay */}
      {(transcript || lastCommand || error) && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          {error && (
            <div className="bg-red-900/90 text-red-100 text-xs p-2 rounded-lg mb-1">
              {error}
            </div>
          )}
          {transcript && !lastCommand && (
            <div className="bg-slate-800/90 text-slate-200 text-xs p-2 rounded-lg">
              Hearing: "{transcript}"
            </div>
          )}
          {lastCommand && (
            <div className="bg-green-900/90 text-green-100 text-xs p-2 rounded-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {lastCommand.action}
              {lastCommand.team && ` (${lastCommand.team})`}
            </div>
          )}
        </div>
      )}

      {/* Help panel */}
      {showHelp && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-slate-800 rounded-lg shadow-xl border border-slate-700 z-50">
          <div className="p-3 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">Voice Commands</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-slate-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-3 max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {voiceCommandHelp.map((item, i) => (
                <div key={i} className="text-xs">
                  <code className="text-blue-400">{item.command}</code>
                  <p className="text-slate-400 mt-0.5">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
