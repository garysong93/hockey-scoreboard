export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 mt-auto safe-area-bottom bg-slate-900/50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Brand */}
          <div>
            <a href="/" className="text-lg font-bold text-white hover:opacity-80 transition-opacity">
              Hockey Scoreboard Online
            </a>
            <p className="text-sm text-slate-400 mt-2">
              Free online hockey scoreboard for ice hockey, roller hockey, and street hockey.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/tutorial" className="text-sm text-slate-300 hover:text-white transition-colors">
                  How to Use
                </a>
              </li>
              <li>
                <a href="/rules" className="text-sm text-slate-300 hover:text-white transition-colors">
                  Hockey Rules
                </a>
              </li>
              <li>
                <a href="/faq" className="text-sm text-slate-300 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Features
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Game Timer</li>
              <li>Penalty Tracking</li>
              <li>Power Play Indicator</li>
              <li>Shots on Goal</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} Hockey Scoreboard Online. Free to use for all hockey games.
          </p>
        </div>
      </div>
    </footer>
  );
}
