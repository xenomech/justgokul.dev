'use client';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';

export const HomeBanner = () => {
  return (
    <section className="home-banner flex w-full flex-col items-center justify-center gap-8 pt-10 ">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="heading">Hey, 👋 I&apos;m Gokul</h1>
        <p className="subheading max-w-2xl">
          Welcome to my spot on the web. I am a software engineer who builds and
          occasionally design websites and apps. I started this blog to keep
          track of the things I do! Glad you are here!
        </p>
      </div>
      <Button
        variant="primary"
        onClick={() => window.open('https://share.justgokul.dev')}
        className="flex items-center justify-center gap-2"
      >
        <p className="font-medium">Connect</p>
        <ArrowIcon className="h-3 w-3" />
      </Button>
    </section>
  );
};
