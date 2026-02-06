import { ReactNode } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen gradient-page">
      <Navigation />
      <main className="pt-14 md:pt-0 md:pl-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
