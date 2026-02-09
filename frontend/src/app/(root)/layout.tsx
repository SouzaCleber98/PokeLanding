import { ReactNode } from 'react';

// Components
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function mainLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
