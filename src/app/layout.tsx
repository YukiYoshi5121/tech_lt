import './globals.css';
import type { Metadata } from 'next';

import StyledComponentsRegistry from '../lib/AntdRegistry';

export const metadata: Metadata = {
  title: 'Sample for LT',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
