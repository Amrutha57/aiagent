import './globals.css';
import Navbar from './components/footer';
import Footer from './components/navbar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'AI ChatApp',
  description: 'Next.js + FastAPI Gemini powered AI chat application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Footer />
        <main className="flex-1 px-6 py-8">{children}</main>
        <Navbar />
      </body>
    </html>
  );
}
