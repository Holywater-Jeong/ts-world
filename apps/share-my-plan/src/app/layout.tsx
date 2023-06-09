import './globals.css';

import { Inter } from 'next/font/google';

import { NextAuthProvider } from './providers';
import { AppBar } from './components/layout.component';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Share My Plan (Schema! Plan)',
  description: 'Share My Plan for Every One',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <AppBar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
