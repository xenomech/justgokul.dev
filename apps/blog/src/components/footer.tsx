import { NAV_LINKS, SOCIALS } from '@/assets/store';
import Image from 'next/image';
import { TrackedLink } from './tracked-link';

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
                Gokul Suresh ·{' '}
                <TrackedLink
                  href="/stories"
                  eventName="footer_personal_clicked"
                  eventProperties={{ page: 'stories', location: 'footer' }}
                >
                  Personal
                </TrackedLink>{' '}
                <TrackedLink
                  href="/blog"
                  eventName="footer_blog_clicked"
                  eventProperties={{ page: 'blog', location: 'footer' }}
                >
                  Blog
                </TrackedLink>
              </p>
              <p className="text-dawn-900 mt-1">Blog content managed using contentlayer.</p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="dash flex flex-col items-start justify-center gap-4 rounded-lg p-4 sm:items-end">
          <div className="flex items-start justify-center gap-6">
            {NAV_LINKS.map(item => (
              <TrackedLink
                key={item}
                aria-label={item}
                className="text-dawn-900 capitalize transition-all duration-200 ease-out hover:text-black"
                href={`/${item.toLowerCase()}`}
                eventName={`footer_item_${item.toLowerCase()}_clicked`}
                eventProperties={{ page: item.toLowerCase(), location: 'footer' }}
              >
                {item}
              </TrackedLink>
            ))}
          </div>
          <div className="flex items-center gap-6">
            {SOCIALS.map(item => (
              <TrackedLink
                key={item.name}
                href={item.url}
                aria-label={item.name}
                eventName={`footer_item_${item.name.toLowerCase()}_clicked`}
                eventProperties={{ platform: item.name.toLowerCase(), location: 'footer' }}
              >
                <item.icon className="text-dawn-900 h-4 w-4 transition-all duration-200 ease-out hover:text-black" />
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>

      {/* tagline */}
      <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
        <p className="text-dawn-900 mt-4 w-fit">
          Made with ❤️ by
          <TrackedLink
            href="https://github.com/xenomech"
            className="ml-1 mr-1 text-black opacity-75 transition-all duration-200 ease-out hover:opacity-100"
            eventName="footer_item_author_github_clicked"
            eventProperties={{ platform: 'github', location: 'footer' }}
          >
            xenomech
          </TrackedLink>
          using
          <TrackedLink
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-black opacity-75 transition-all duration-200 ease-out hover:opacity-100"
            eventName="footer_item_nextjs_clicked"
            eventProperties={{ tech: 'nextjs', location: 'footer' }}
          >
            Next.js
          </TrackedLink>
        </p>
        <p className="text-dawn-900 mt-4">© 2025 Gokul Suresh</p>
      </div>
    </footer>
  );
}
