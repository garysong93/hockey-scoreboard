import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Scoreboard } from '../components/Scoreboard';
import { ControlPanel } from '../components/ControlPanel';
import { SEO } from '../components/SEO';

export function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <SEO
        title="Hockey Scoreboard Online - Free Ice Hockey Score Keeper & Timer"
        description="Free online hockey scoreboard with game timer, penalty tracking, power play countdown, shots on goal, and period management. Perfect for ice hockey, roller hockey, and street hockey games."
        canonical="https://www.hockeyscoreboardonline.com/"
      />
      <Header />

      <main className="flex-1 py-6 sm:py-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            Free Online Hockey Scoreboard
          </h1>
          <p className="text-slate-400">
            Track scores, penalties, shots on goal, and more. Perfect for ice hockey, roller hockey, and street hockey.
          </p>
        </div>

        {/* Scoreboard */}
        <Scoreboard />

        {/* Control Panel */}
        <ControlPanel />

        {/* Instructions */}
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <div className="bg-slate-800/30 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Start Guide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">1</span>
                <p><strong>Score Goals:</strong> Click the score number to add a goal. Right-click to remove.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
                <p><strong>Timer:</strong> Click the time to start/stop. Use +10s/-10s buttons to adjust.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">3</span>
                <p><strong>Penalties:</strong> Add penalties with player number and duration. They count down automatically.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">4</span>
                <p><strong>Settings:</strong> Customize team names, colors, period length, and more.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-4xl mx-auto px-4 mt-10">
          <h2 className="text-xl font-bold text-white mb-6 text-center">Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '⏱️', title: 'Game Timer', desc: 'Countdown with period tracking' },
              { icon: '🚨', title: 'Penalty Box', desc: 'Track multiple penalties' },
              { icon: '⚡', title: 'Power Play', desc: 'Auto PP/PK indicators' },
              { icon: '🥅', title: 'Shots Counter', desc: 'Track shots on goal' },
              { icon: '🌙', title: 'Dark Mode', desc: 'Easy on the eyes' },
              { icon: '📱', title: 'Mobile Ready', desc: 'Works on any device' },
              { icon: '💾', title: 'Auto Save', desc: 'Never lose your game' },
              { icon: '🎨', title: 'Customizable', desc: 'Team colors & names' },
            ].map((feature) => (
              <div key={feature.title} className="bg-slate-800/30 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                <p className="text-xs text-slate-400 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
