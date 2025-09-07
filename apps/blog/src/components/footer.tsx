import { NAV_LINKS, SOCIALS } from '@/assets/store';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-base-100 mx-4 mb-9 rounded-lg border-[1px] border-black border-opacity-10 p-6 opacity-80 md:mx-auto md:max-w-xl lg:w-[900px] lg:max-w-full">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        {/* left */}
        <div className="flex max-w-sm flex-col items-start gap-6">
          <div>
            <Image
              src="/favicon/android-chrome-512x512.png"
              width={56}
              height={56}
              alt="logo"
              priority
            />
            <div className="mt-4">
              <p className="font-semibold">
                Gokul Suresh · <Link href="/stories">Personal</Link> <Link href="/blog">Blog</Link>
              </p>
              <p className="text-dawn-900 mt-1">Blog content managed using contentlayer.</p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="dash flex flex-col items-start justify-center gap-4 rounded-lg p-4 sm:items-end">
          <div className="flex items-start justify-center gap-8">
            {NAV_LINKS.map(item => (
              <Link
                key={item}
                aria-label={item}
                className="text-dawn-900 capitalize transition-all duration-200 ease-out hover:scale-105 hover:text-black"
                href={`/${item.toLowerCase()}`}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {SOCIALS.map(item => (
              <Link key={item.name} href={item.url} aria-label={item.name}>
                <item.icon className="text-dawn-900 h-4 w-4 transition-all duration-200 ease-out hover:scale-105 hover:text-black" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* tagline */}
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="text-dawn-900 mt-4">
          Made with ❤️ By
          <span className="text-black opacity-75">&nbsp;Gokul Suresh&nbsp;</span>
          using
          <a
            href="https://nextjs.org"
            className="text-black opacity-75 transition-all duration-200 ease-out hover:scale-105 hover:opacity-100"
          >
            &nbsp;Next.js
          </a>
        </p>
        <p className="text-dawn-900 mt-4">© 2023 Gokul Suresh</p>
      </div>
    </footer>
  );
}
