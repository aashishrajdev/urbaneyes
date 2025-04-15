import './globals.css';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'UrbanEyes - Camera Management System',
  description: 'A comprehensive camera management system for urban surveillance',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
      </body>
    </html>
  );
} 