import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/SEO';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: { category: string; items: FAQItem[] }[] = [
  {
    category: 'Getting Started',
    items: [
      {
        question: 'Is this hockey scoreboard really free?',
        answer: 'Yes! Hockey Scoreboard Online is completely free to use. No registration, no hidden fees, no premium tiers. All features are available to everyone.',
      },
      {
        question: 'Do I need to create an account?',
        answer: 'No account is required. Simply open the website and start using the scoreboard immediately. Your game data is saved locally in your browser.',
      },
      {
        question: 'Does the scoreboard work offline?',
        answer: 'Yes, once the page is loaded, the scoreboard works offline. Your game state is saved to your browser\'s local storage, so you won\'t lose your progress even if you lose internet connection.',
      },
      {
        question: 'Can I use this on my phone or tablet?',
        answer: 'Absolutely! The scoreboard is fully responsive and works great on any device - desktop computers, laptops, tablets, and smartphones. The interface adapts to your screen size.',
      },
    ],
  },
  {
    category: 'Features & Usage',
    items: [
      {
        question: 'How do I add a goal?',
        answer: 'Simply click (or tap) on the team\'s score number to add a goal. To remove a goal (if you made a mistake), right-click on desktop or long-press on mobile.',
      },
      {
        question: 'How does the penalty timer work?',
        answer: 'Click "Add Penalty" for a team, enter the player number and select the penalty type. The penalty timer will count down automatically when the game clock is running. Minor penalties end early if the opposing team scores.',
      },
      {
        question: 'What is the power play indicator?',
        answer: 'The PP (Power Play) indicator appears when one team has a player advantage due to penalties. It shows which team is on the power play and updates automatically as penalties expire.',
      },
      {
        question: 'Can I customize team names and colors?',
        answer: 'Yes! Click on a team name to edit it, or use the Settings panel to customize team colors, period length, and other game settings.',
      },
      {
        question: 'How do I reset the game?',
        answer: 'Use the Reset button in the control panel to start a new game. You can choose to reset just the current period or the entire game including scores.',
      },
    ],
  },
  {
    category: 'Sharing & Streaming',
    items: [
      {
        question: 'Can I share the scoreboard with others?',
        answer: 'Yes! Use the Share feature to generate a link that others can use to view your scoreboard in real-time. They\'ll see live updates as you track the game.',
      },
      {
        question: 'How do I use the scoreboard for live streaming?',
        answer: 'Click the Share button and copy the OBS Overlay URL. In OBS, add a Browser Source and paste the URL. The overlay is designed to be transparent and can be positioned over your video feed.',
      },
      {
        question: 'Can I export the scoreboard as an image?',
        answer: 'Yes, use the Export feature to save a PNG screenshot of the current scoreboard. This is great for sharing final scores on social media.',
      },
    ],
  },
  {
    category: 'Technical Questions',
    items: [
      {
        question: 'Is my game data saved?',
        answer: 'Yes, your game state is automatically saved to your browser\'s local storage. When you return to the site, your game will be exactly where you left it.',
      },
      {
        question: 'How do I clear my saved data?',
        answer: 'Use the Reset button with the "Clear all data" option, or clear your browser\'s local storage for this site through your browser settings.',
      },
      {
        question: 'Does this work with voice commands?',
        answer: 'Yes! Enable voice control in settings. You can say commands like "Home goal", "Away penalty", or "Start timer" to control the scoreboard hands-free.',
      },
      {
        question: 'What browsers are supported?',
        answer: 'The scoreboard works in all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser.',
      },
    ],
  },
  {
    category: 'Privacy & Security',
    items: [
      {
        question: 'Do you collect my personal data?',
        answer: 'No personal data is collected. All game data is stored locally on your device. We don\'t have user accounts, so there\'s no personal information to store.',
      },
      {
        question: 'Is shared game data secure?',
        answer: 'Shared games use randomly generated IDs. Only people with the link can view your game. No sensitive information is transmitted.',
      },
    ],
  },
];

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.flatMap((category) =>
    category.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
  ),
};

export function FAQPage() {
  return (
    <PageLayout>
      <SEO
        title="FAQ - Hockey Scoreboard Online | Common Questions Answered"
        description="Find answers to frequently asked questions about Hockey Scoreboard Online. Learn about features, usage, sharing, streaming, privacy, and technical support."
        canonical="https://www.hockeyscoreboardonline.com/faq"
        structuredData={faqStructuredData}
      />
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions - Hockey Scoreboard Online
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about our free hockey scoreboard app.
            Can't find what you're looking for? Reach out to us.
          </p>
        </div>

        {/* FAQ Categories */}
        {faqData.map((category) => (
          <section key={category.category} className="mb-10">
            <h2 className="text-xl font-bold text-white mb-6 pb-2 border-b border-slate-700">
              {category.category}
            </h2>
            <div className="space-y-4">
              {category.items.map((item, index) => (
                <div key={index} className="bg-slate-800/30 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">
                      Q
                    </span>
                    {item.question}
                  </h3>
                  <p className="text-slate-300 pl-9">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Still Have Questions */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-slate-300 mb-6">
              Check out our tutorial for detailed instructions, or learn the basics of hockey rules.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/tutorial"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                View Tutorial
              </a>
              <a
                href="/rules"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Hockey Rules
              </a>
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
