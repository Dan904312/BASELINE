import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Benchline',
  description: 'Your outcome-driven AI performance system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
