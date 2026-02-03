import { PageLayout } from '../components/layout/PageLayout';

export function TutorialPage() {
  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How to Use This Free Online Hockey Scoreboard
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Learn how to use our hockey score keeper app to track games like a pro.
            This tutorial covers all features of our online scoreboard.
          </p>
        </div>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">1</span>
            Quick Start Guide
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6 space-y-4">
            <p className="text-slate-300">
              Getting started with our ice hockey scoreboard is simple. When you first load the app,
              you'll see a fully functional scoreboard ready for your game.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
              <li>No account or registration required - just open and start tracking</li>
              <li>Your game state is automatically saved to your browser</li>
              <li>Works on any device - desktop, tablet, or mobile phone</li>
              <li>Dark mode by default for easy viewing at the rink</li>
            </ul>
          </div>
        </section>

        {/* Scoring Controls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">2</span>
            Scoring Controls
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              The hockey score keeper makes it easy to track goals for both teams:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Add a Goal</h3>
                <p className="text-sm text-slate-400">
                  Click (or tap) the team's score number to add a goal. You'll see the score
                  update instantly.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Remove a Goal</h3>
                <p className="text-sm text-slate-400">
                  Right-click (or long-press on mobile) to remove a goal if you made a mistake.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Shots on Goal</h3>
                <p className="text-sm text-slate-400">
                  Track shots on goal using the SOG counters below each team's score.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Team Names</h3>
                <p className="text-sm text-slate-400">
                  Click on a team name to customize it. Changes save automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Timer Management */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">3</span>
            Timer Management
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              Our hockey game timer offers full control over game timing:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">Start/Stop:</span>
                <span>Click the timer display to start or pause the countdown.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Adjust Time:</span>
                <span>Use the +10s and -10s buttons to make quick adjustments.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold">Period Control:</span>
                <span>The period indicator shows the current period. Click to advance manually.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">Reset:</span>
                <span>Use the reset button in settings to start a new period or game.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Penalty Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">4</span>
            Penalty Tracking
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              Track penalties with our built-in penalty box feature:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Adding Penalties</h3>
                <p className="text-sm text-slate-400">
                  Click "Add Penalty" for a team, enter the player number, select the penalty
                  type (Minor, Major, Misconduct), and the timer will start automatically when
                  the game clock is running.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Power Play Timer</h3>
                <p className="text-sm text-slate-400">
                  When one team has more players in the penalty box, the power play indicator
                  activates automatically. The PP/PK status updates in real-time.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Early Release</h3>
                <p className="text-sm text-slate-400">
                  Click on an active penalty to release it early (e.g., when a power play goal
                  is scored on a minor penalty).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">5</span>
            Live Sharing
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              Share your game with fans and friends in real-time:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Share Link:</span>
                <span>Generate a unique URL that others can open to see live score updates.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">OBS Overlay:</span>
                <span>Use the overlay URL to display the scoreboard in your live stream.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">Customizable:</span>
                <span>Adjust colors and styles for the overlay to match your stream theme.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Export Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg">6</span>
            Export Options
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              Save and share your game results:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Screenshot</h3>
                <p className="text-sm text-slate-400">
                  Export a PNG image of the current scoreboard to share on social media.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Game History</h3>
                <p className="text-sm text-slate-400">
                  View past games and their final scores in the history panel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Scoreboard */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <span>Start Using the Scoreboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
