import type { Metadata } from 'next';

import StyledComponentsRegistry from '../lib/registry';

export const metadata: Metadata = {
  title: 'Return system prototype',
  description: 'Prototype for the return system of the FOV',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
