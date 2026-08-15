import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

export const metadata: Metadata = {
  title: 'PokeLanding',
  description: 'Landing page para um projeto de pokemon',
  authors: { name: 'CleberSouza' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
        <Toaster position='top-center' closeButton />
      </body>
    </html>
  );
}
