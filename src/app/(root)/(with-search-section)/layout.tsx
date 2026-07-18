import SearchSection from '@/components/search-section/search-section';
import { ReactNode } from 'react';

export default function WithSearchSectionLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SearchSection />
      <main>{children}</main>
    </>
  );
}
