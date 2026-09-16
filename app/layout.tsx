import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AmbientCursor } from '@/components/ambient-cursor';
import { PageLoader } from '@/components/page-loader';
import { MotionEffects } from './motion-effects';
import './globals.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata: Metadata = {
  title: "Jiwoo Jeong's Portfolio",
  description: 'Language data, evaluation workflows, and production AI systems by Jiwoo Jeong in Seattle, WA.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={poppins.variable}>
        <MotionEffects />
        <AmbientCursor />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
