import { Header } from '../Header';
import { Footer } from '../Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Header />
      <main className="flex-1 py-6 sm:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
