import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { AmbientCursor } from '@/components/ambient-cursor';
import { homeContent } from '@/lib/home-content';
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
        <div className="aa-loader" aria-hidden="true">
          <div className="aa-loader__content">
            <strong>{homeContent.name}</strong>
            <div className="aa-loader__progress">
              <i />
            </div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
