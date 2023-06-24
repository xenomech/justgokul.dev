import { GithubIcon, TwitterIcon } from '@/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
export default function Navbar() {
  const NAV_LINKS = ['blog', 'snippets', 'about'];
  return (
    <nav className="bg-base-100 max-w-4xl mx-auto rounded-full border-[1px] border-black border-opacity-10 opacity-80 fixed w-[900px] left-1/2 -translate-x-1/2 mt-6">
      <div className="flex items-center justify-between p-4">
        <Image
          src="/favicon/android-chrome-512x512.png"
          width={28}
          height={28}
          alt="logo"
        />
        <div className="flex items-center gap-8 font-inter px-4">
          {NAV_LINKS.map((item) => (
            <Link
              className="text-dawn-900 hover:text-black capitalize"
              href={item}
              key={item}
            >
              {item}
            </Link>
          ))}
          <Link
            className="text-dawn-900 hover:text-black capitalize"
            href="https://twiiter.com/justgokuldotdev"
          >
            <TwitterIcon className="w-4 h-4 text-dawn-900 hover:text-black" />
          </Link>
          <Link href="https://github.com/xenomech">
            <GithubIcon className="w-4 h-4 text-dawn-900 hover:text-black" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
