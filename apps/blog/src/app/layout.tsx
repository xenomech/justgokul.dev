import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import '@/styles/globals.scss';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Source_Code_Pro } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata = {
  metadataBase: new URL('https://justgokul.dev'),
  title: 'Gokul Suresh - Software Developer',
  name: 'Gokul Suresh',
  description: 'All my scribbles are available here',
  type: 'website',
  keywords: ['nextjs', 'react', 'javascript', 'software engineer'],
  openGraph: {
    images: ['/media/og_image.png'],
  },
  twitter: {
    title: 'Gokul Suresh - Software Developer',
    name: 'Gokul Suresh',
    description: 'All my scribbles are available here',
    card: 'summary',
    site: '@justgokuldotdev',
    creator: '@justgokuldotdev',
    images: ['/media/twitter_image.png'],
  },
  robots: {
    googleBot: {
      index: true,
      follow: false,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </head>
      <body className={`${inter.variable} ${sourceCodePro.variable}`}>
        <Navbar />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
