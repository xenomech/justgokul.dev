'use client';
import { GithubIcon, MenuIcon, TwitterIcon } from '@/assets/icons';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const NAV_LINKS = ['blog', 'snippets', 'about'];
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed left-1/2 z-30 mt-6 w-full max-w-[343px]	-translate-x-1/2 rounded-full border-[1px] border-black border-opacity-10 bg-base-100 opacity-80 backdrop-blur backdrop-filter md:max-w-xl lg:w-[900px] lg:max-w-full">
      <div className="flex items-center justify-between p-4">
        <Image
          src="/favicon/android-chrome-512x512.png"
          width={28}
          height={28}
          alt="logo"
        />
        <div className="hidden items-center gap-8 px-4 font-inter lg:flex">
          {NAV_LINKS.map((item) => (
            <Link
              className="capitalize text-dawn-900 hover:text-black"
              href={item}
              key={item}
            >
              {item}
            </Link>
          ))}
          <Link
            className="capitalize text-dawn-900 hover:text-black"
            href="https://twiiter.com/justgokuldotdev"
          >
            <TwitterIcon className="h-4 w-4 text-dawn-900 hover:text-black" />
          </Link>
          <Link href="https://github.com/xenomech">
            <GithubIcon className="h-4 w-4 text-dawn-900 hover:text-black" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Trigger>
              <MenuIcon className="h-6 w-6 text-dawn-900 hover:text-black" />
            </AlertDialog.Trigger>
          </AlertDialog.Root>
        </div>
      </div>
    </nav>
  );
}
