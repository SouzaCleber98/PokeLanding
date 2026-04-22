import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '@/context/auth-context/auth-provider';

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
