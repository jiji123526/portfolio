import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Jiwoo Jeong — AI Product Designer & Builder',
  description: 'AI products, interaction systems, and full-stack case studies by Jiwoo Jeong in Seattle, WA.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={poppins.variable}>{children}</body></html>;
}
