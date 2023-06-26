'use client';
import { allPosts, allSnippets } from '.contentlayer/generated';
import { CloseIcon, GithubIcon, MenuIcon, TwitterIcon } from '@/assets/icons';
import { sortFrontMatter } from '@/lib/common';
import * as Modal from '@radix-ui/react-alert-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import CommandMenu from '../command/Command';

const NAV_LINKS = ['Blog', 'Snippets', 'About'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const postMatter = sortFrontMatter(allPosts);
  const snippetMatter = sortFrontMatter(allSnippets);
  const commandOptions = postMatter.concat(snippetMatter);
  return (
    <nav className="fixed left-1/2 z-20 mt-6 w-full max-w-[343px]	-translate-x-1/2 rounded-full border-[1px] border-black border-opacity-10 bg-base-100 bg-opacity-80 backdrop-blur-md md:max-w-xl lg:w-[900px] lg:max-w-full">
      <div className="flex items-center justify-between p-4">
        <Link
          href="/"
          className="transition-all duration-150 ease-in-out hover:rotate-90 hover:scale-105"
        >
          <Image
            src="/favicon/android-chrome-512x512.png"
            width={28}
            height={28}
            alt="logo"
          />
        </Link>
        <CommandMenu data={commandOptions} />
        <NavItems className="hidden items-center gap-8 px-4 lg:flex" />

        <div className="flex lg:hidden">
          <Modal.Root open={open} onOpenChange={setOpen}>
            <Modal.Trigger>
              <MenuIcon className="h-6 w-6 text-dawn-900 hover:text-black" />
            </Modal.Trigger>
            <Modal.Portal>
              <Modal.Overlay className="fixed inset-0 z-20 bg-base-100 bg-opacity-80 backdrop-blur-sm transition-opacity duration-100 ease-in-out" />
              <Modal.Content className="fixed left-1/2 top-1/2 z-30 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 ">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-md border-[1px] border-black border-opacity-30 bg-base-100 p-4 shadow-lg">
                    <NavItems
                      className="flex items-center gap-6 px-4"
                      clickHandler={() => setOpen(false)}
                    />
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full border-[1px] border-black border-opacity-30 bg-base-100 p-2 shadow-lg"
                  >
                    <CloseIcon className="h-6 w-6 text-dawn-900 hover:text-black" />
                  </button>
                </div>
              </Modal.Content>
            </Modal.Portal>
          </Modal.Root>
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
              className="capitalize text-dawn-900 transition-all duration-150 ease-in-out hover:text-black"
              onClick={() => {
                router.push(`/${item.toLowerCase()}`);
                clickHandler && clickHandler();
              }}
            >
              {item}
            </button>
          ) : (
            <Link
              className="capitalize text-dawn-900 transition-all duration-150 ease-in-out hover:text-black"
              href={`/${item.toLowerCase()}`}
            >
              {item}
            </Link>
          )}
        </div>
      ))}
      <Link href="https://twiiter.com/justgokuldotdev">
        <TwitterIcon className="h-4 w-4 text-dawn-900 transition-all duration-150 ease-in-out hover:text-black" />
      </Link>
      <Link href="https://github.com/xenomech">
        <GithubIcon className="h-4 w-4 text-dawn-900 transition-all duration-150 ease-in-out hover:text-black" />
      </Link>
    </div>
  );
};
