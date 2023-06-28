import { allSnippets } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import { TWEET_ID } from '@/assets/store';
import Button from '@/components/button/Button';
import ListCard from '@/components/list/ListCard';
import { sortFrontMatter } from '@/lib/common';
import Image from 'next/image';

export default function Snippets() {
  const snippets = sortFrontMatter(allSnippets);
  return (
    <div className="mx-4 max-w-7xl pb-20 font-inter lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-20">
        <section className="snippet-banner flex w-full flex-col items-start justify-center gap-8 pt-36 lg:pb-44 lg:pt-52">
          <div className="flex flex-col items-start justify-start gap-6 lg:ml-56">
            <Button
              className="flex items-center justify-center gap-2"
              type="Navigator"
              action="Back"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
              <p>Go Back</p>
            </Button>
            <h1 className="heading">Snippets & Threads</h1>
            <p className="subheading max-w-2xl">
              Sharing small snippets and tweet threads that helped me automate
              or understand simple concepts.
            </p>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between md:flex-row">
          <div className="illustration">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image src="/assets/snippets_desktop.svg" alt="snippets" fill />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image src="/assets/snippets_mobile.svg" alt="snippets" fill />
            </div>
          </div>
          <div className="posts w-full md:w-2/3">
            {snippets.map((item) => (
              <ListCard
                title={item.title}
                slug={item.slug}
                readingTime={item.readingTime}
                date={item.date}
                type="snippets"
                key={item.slug}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between md:flex-row-reverse">
          <div className="illustration">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image src="/assets/threads_desktop.svg" alt="snippets" fill />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image src="/assets/threads_mobile.svg" alt="snippets" fill />
            </div>
          </div>
          <div className="posts w-full md:w-2/3">
            {TWEET_ID.map((item) => (
              <ListCard
                key={item.slug}
                title={item.title}
                slug={item.slug}
                type="tweet"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
