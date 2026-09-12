import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ variable: '--font-poppins', subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export const metadata: Metadata = { title: 'Your Name — Product Designer', description: 'Selected product design work and case studies.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={poppins.variable}>{children}</body></html>;
}
