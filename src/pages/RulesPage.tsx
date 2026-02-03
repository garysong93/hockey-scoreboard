import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/SEO';

const rulesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hockey Rules - Complete Guide for Ice Hockey',
  description: 'Learn the essential ice hockey regulations, from game structure to penalty rules. Covers periods, scoring, penalties, power plays, overtime, and key hockey terms.',
  author: {
    '@type': 'Organization',
    name: 'Hockey Scoreboard Online',
    url: 'https://www.hockeyscoreboardonline.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Hockey Scoreboard Online',
    url: 'https://www.hockeyscoreboardonline.com',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.hockeyscoreboardonline.com/rules',
  },
};

export function RulesPage() {
  return (
    <PageLayout>
      <SEO
        title="Hockey Rules Guide - Ice Hockey Regulations & Penalties Explained"
        description="Complete guide to ice hockey rules: game structure, scoring, penalties (minor, major, misconduct), power plays, overtime, and shootouts. Perfect for players and fans."
        canonical="https://www.hockeyscoreboardonline.com/rules"
        structuredData={rulesStructuredData}
      />
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Hockey Rules - Complete Guide for Ice Hockey
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Learn the essential ice hockey regulations, from game structure to penalty rules.
            Perfect for new fans and players.
          </p>
        </div>

        {/* Game Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </span>
            Game Structure
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              Ice hockey games are divided into three periods of play:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">20</div>
                <div className="text-sm text-slate-400">Minutes per Period (NHL)</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">3</div>
                <div className="text-sm text-slate-400">Periods per Game</div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-400">60</div>
                <div className="text-sm text-slate-400">Total Minutes</div>
              </div>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-white">Regular Time:</strong> Three 20-minute periods with intermissions between periods.</li>
              <li><strong className="text-white">Running Clock:</strong> The clock stops during stoppages of play (penalties, goals, icing, etc.).</li>
              <li><strong className="text-white">Face-offs:</strong> Used to restart play after each stoppage.</li>
            </ul>
          </div>
        </section>

        {/* Scoring Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            Scoring Rules
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              A goal is scored when the puck completely crosses the goal line between the posts and under the crossbar:
            </p>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">1 Point:</span>
                <span>Each goal is worth exactly one point. There are no 2-point or 3-point goals in hockey.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">Assists:</span>
                <span>Up to two assists can be awarded to players who touched the puck before the goal scorer.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-400 font-bold">Power Play Goal:</span>
                <span>A goal scored while the opposing team has a player in the penalty box.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">Disallowed Goal:</span>
                <span>Goals can be disallowed for kicking, high-sticking, or goaltender interference.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Penalty Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
            Penalty Types
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              Hockey penalties range from minor infractions to major violations:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">Minor Penalty (2 minutes)</h3>
                <p className="text-sm text-slate-400 mb-2">
                  The most common penalty. Player serves 2 minutes in the penalty box. Ends early if the opposing team scores.
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Examples:</strong> Tripping, hooking, slashing, interference, holding, high-sticking
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-orange-400 mb-2">Double Minor (4 minutes)</h3>
                <p className="text-sm text-slate-400 mb-2">
                  Two consecutive minor penalties. If a goal is scored, only the first 2 minutes are removed.
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Examples:</strong> High-sticking causing injury, drawing blood
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-400 mb-2">Major Penalty (5 minutes)</h3>
                <p className="text-sm text-slate-400 mb-2">
                  Served in full regardless of goals scored. Often results from fighting or severe infractions.
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Examples:</strong> Fighting, boarding, checking from behind
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-2">Misconduct (10 minutes)</h3>
                <p className="text-sm text-slate-400 mb-2">
                  Player sits out 10 minutes but team doesn't play short-handed (another player serves any concurrent penalty).
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Examples:</strong> Unsportsmanlike conduct, abuse of officials
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-600 mb-2">Game Misconduct</h3>
                <p className="text-sm text-slate-400">
                  Player is ejected for the remainder of the game. May include automatic suspension.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Power Play Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </span>
            Power Play Rules
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              When a team has a player advantage due to an opponent's penalty:
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">Power Play (PP)</h3>
                <p className="text-sm text-slate-400">
                  The team with more players on the ice. Common situations: 5-on-4, 5-on-3, or 4-on-3.
                </p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-red-400 mb-2">Penalty Kill (PK)</h3>
                <p className="text-sm text-slate-400">
                  The shorthanded team trying to prevent goals until their player returns.
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-white">Minor Penalty Release:</strong> If the power play team scores, the penalized player is released early.</li>
              <li><strong className="text-white">Major Penalty:</strong> The full 5 minutes must be served regardless of goals scored.</li>
              <li><strong className="text-white">4-on-4:</strong> When both teams have a player in the box, teams play at even strength.</li>
              <li><strong className="text-white">5-on-3:</strong> When the opposing team has two players in the box simultaneously.</li>
            </ul>
          </div>
        </section>

        {/* Overtime & Shootout */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </span>
            Overtime & Shootout
          </h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">
              When games are tied at the end of regulation:
            </p>
            <div className="space-y-4">
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Regular Season Overtime (NHL)</h3>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>5-minute sudden death overtime period</li>
                  <li>3-on-3 hockey for faster action</li>
                  <li>First team to score wins</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Shootout</h3>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>If overtime ends tied, teams go to a shootout</li>
                  <li>Best of 3 shooters, then sudden death rounds</li>
                  <li>Each player takes a penalty shot against the goalie</li>
                </ul>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Playoff Overtime</h3>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>Full 20-minute periods at 5-on-5</li>
                  <li>No shootout - play continues until someone scores</li>
                  <li>Some games have gone to multiple overtime periods</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Key Hockey Terms</h2>
          <div className="bg-slate-800/30 rounded-xl p-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { term: 'Icing', definition: 'Shooting the puck from behind center ice across the opposing goal line without it being touched.' },
                { term: 'Offside', definition: 'When an attacking player enters the offensive zone before the puck.' },
                { term: 'Hat Trick', definition: 'When a player scores three goals in a single game.' },
                { term: 'Empty Net', definition: 'When a team pulls their goalie for an extra attacker, leaving the net unguarded.' },
                { term: 'Face-off', definition: 'How play is started or resumed; the puck is dropped between two opposing players.' },
                { term: 'Slapshot', definition: 'A powerful shot where the player winds up and strikes the puck with force.' },
              ].map((item) => (
                <div key={item.term} className="bg-slate-700/30 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-400 mb-1">{item.term}</h3>
                  <p className="text-sm text-slate-400">{item.definition}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Scoreboard */}
        <div className="text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            <span>Go to Scoreboard</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
