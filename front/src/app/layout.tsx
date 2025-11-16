import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'InterviewAI',
  description: 'AI-powered interview training',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
