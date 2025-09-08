'use client';
import { GithubIcon, TwitterIcon } from '@/assets/icons';
import { NAV_LINKS } from '@/assets/store';
import { Dialog } from '@repo/ui';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-base-100 fixed left-1/2 z-20 mt-6 w-full	max-w-[343px] -translate-x-1/2 rounded-full border-[1px] border-black border-opacity-10 bg-opacity-80 backdrop-blur-md md:max-w-xl lg:w-[900px] lg:max-w-full">
      <div className="flex items-center justify-between p-4">
        <Link
          href="/"
          className="transition-all duration-200 ease-out hover:rotate-90 hover:scale-105"
        >
          <Image src="/favicon/android-chrome-512x512.png" width={28} height={28} alt="logo" />
        </Link>
        <NavItems className="hidden items-center gap-8 px-4 lg:flex" />

        <div className="flex lg:hidden">
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger aria-label="Mobile navbar open">
              <Menu className="text-dawn-900 h-6 w-6 hover:text-black" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="bg-base-100 fixed inset-0 z-20 bg-opacity-80 backdrop-blur-sm transition-opacity duration-200 ease-out" />
              <Dialog.Content className="fixed left-1/2 top-1/2 z-30 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 ">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="bg-base-100 rounded-md border-[1px] border-black border-opacity-30 p-4 shadow-lg">
                    <NavItems
                      className="flex items-center gap-6 px-4"
                      clickHandler={() => setOpen(false)}
                    />
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="bg-base-100 group rounded-full border-[1px] border-black border-opacity-30 p-2 shadow-lg transition-all duration-200 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
                    aria-label="Close modal"
                  >
                    <X className="text-dawn-900 size-4 transition-colors duration-200 ease-out group-hover:text-black/75" />
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </nav>
  );
}

type NavItemType = {
  className?: string;
  clickHandler?: () => void;
};
const NavItems = ({ className, clickHandler }: NavItemType) => {
  const router = useRouter();
  return (
    <div className={className}>
      {NAV_LINKS.map((item: string) => (
        <div key={item}>
          {clickHandler ? (
            <button
              className="text-dawn-900 capitalize transition-all duration-200 ease-out hover:scale-105 hover:text-black"
              onClick={() => {
                router.push(`/${item.toLowerCase()}`);
                clickHandler && clickHandler();
              }}
            >
              {item}
            </button>
          ) : (
            <Link
              className="text-dawn-900 capitalize transition-all duration-200 ease-out hover:scale-105 hover:text-black"
              href={`/${item.toLowerCase()}`}
              aria-label={item}
            >
              {item}
            </Link>
          )}
        </div>
      ))}
      <Link
        href="https://x.com/justgokuldotdev"
        aria-label="twitter connect button"
        className="hidden md:block"
      >
        <TwitterIcon className="text-dawn-900 h-4 w-4 transition-all duration-200 ease-out hover:scale-105 hover:text-black" />
      </Link>
      <Link
        href="https://github.com/xenomech"
        aria-label="github connect button"
        className="hidden md:block"
      >
        <GithubIcon className="text-dawn-900 h-4 w-4 transition-all duration-200 ease-out hover:scale-105 hover:text-black" />
      </Link>
    </div>
  );
};
