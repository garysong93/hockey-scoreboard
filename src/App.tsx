import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { OverlayPage } from './pages/OverlayPage';
import { useGameStore } from './stores/gameStore';

function App() {
  const { theme } = useGameStore();

  // Simple routing based on URL path
  const path = window.location.pathname;

  // Overlay page - skip theme effects for performance
  if (path === '/overlay') {
    return <OverlayPage />;
  }

  // Apply theme class to document for non-overlay pages
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  // TODO: Add additional pages
  // if (path === '/tutorial') {
  //   return <TutorialPage />;
  // }
  // if (path === '/rules') {
  //   return <RulesPage />;
  // }
  // if (path === '/faq') {
  //   return <FAQPage />;
  // }

  // Redirect any other path to homepage
  if (path !== '/' && path !== '/index.html') {
    window.location.replace('/');
    return null;
  }

  return <HomePage />;
}

export default App;
