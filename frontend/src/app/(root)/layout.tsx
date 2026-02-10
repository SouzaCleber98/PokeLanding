import { ReactNode } from 'react';

// Components
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
import SearchSection from '@/components/search-section/search-section';

export default function mainLayout({ children }: { children: ReactNode }) {
  return (
    <main className='h-full w-full'>
      <Header />
      <SearchSection />

      {children}

      <Footer />
    </main>
  );
}
