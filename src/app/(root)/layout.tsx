import { ReactNode } from 'react';

// Components
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
}
