import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '../lib/registry';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Return system prototype',
  description: 'Prototype for the return system of the FOV',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
