import { useEffect } from 'react';
import { OverlayScoreboard } from '../components/OverlayScoreboard';
import { useTimer } from '../hooks/useTimer';

// Parse URL parameters
function getUrlParams(): {
  theme: 'minimal' | 'full';
  position: 'top' | 'bottom';
  showPenalties: boolean;
  transparent: boolean;
} {
  const params = new URLSearchParams(window.location.search);

  return {
    theme: (params.get('theme') as 'minimal' | 'full') || 'minimal',
    position: (params.get('position') as 'top' | 'bottom') || 'top',
    showPenalties: params.get('showPenalties') !== 'false',
    transparent: params.get('transparent') !== 'false',
  };
}

export function OverlayPage() {
  const { theme, position, showPenalties, transparent } = getUrlParams();

  // Start timer hook for penalty countdown
  useTimer();

  // Set transparent background for OBS chroma key
  useEffect(() => {
    if (transparent) {
      document.body.style.backgroundColor = 'transparent';
      document.documentElement.style.backgroundColor = 'transparent';
    }

    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
    };
  }, [transparent]);

  return (
    <div
      className={`min-h-screen ${transparent ? 'bg-transparent' : 'bg-green-500'}`}
      style={transparent ? {} : { backgroundColor: '#00ff00' }}
    >
      <OverlayScoreboard
        theme={theme}
        position={position}
        showPenalties={showPenalties}
      />

      {/* Help text - only visible when not in OBS */}
      {!transparent && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-md text-sm">
          <h3 className="font-bold mb-2">OBS Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-1 text-slate-300">
            <li>Add a Browser Source in OBS</li>
            <li>Set URL to: <code className="bg-slate-700 px-1 rounded">{window.location.origin}/overlay?transparent=true</code></li>
            <li>Set width: 400, height: 150 (adjust as needed)</li>
            <li>Check "Shutdown source when not visible"</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-slate-700">
            <p className="font-semibold mb-1">URL Parameters:</p>
            <ul className="text-xs text-slate-400 space-y-0.5">
              <li><code>theme=minimal|full</code> - Display style</li>
              <li><code>position=top|bottom</code> - Screen position</li>
              <li><code>showPenalties=true|false</code> - Show penalty times</li>
              <li><code>transparent=true|false</code> - Chroma key mode</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
