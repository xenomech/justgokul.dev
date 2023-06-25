import Footer from '@/components/footer/Footer';
import Navbar from '@/components/navbar/Navbar';
import '@/styles/globals.css';
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata = {
  title: 'Gokul Suresh - Software Developer ',
  name: 'Gokul Suresh',
  description: 'All my scribbles are available here',
  type: 'website',
  twitterHandle: '@justgokuldotdev',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <div className="bg -z-30"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
