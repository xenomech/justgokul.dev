import { allPosts, allSnippets } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import Button from '@/components/button/Button';
import ListCard from '@/components/list/ListCard';
import { sortFrontMatter } from '@/lib/common';
import Image from 'next/image';
export default function Home() {
  const posts = sortFrontMatter(allPosts);
  const snippets = sortFrontMatter(allSnippets);
  return (
    <div className="mx-4 max-w-4xl py-48 lg:mx-auto">
      <div className="flex flex-col items-center justify-center gap-28">
        <section className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h1 className="heading">Hey👋, Im Gokul</h1>
            <p className="subheading max-w-2xl">
              Welcome to my spot on the web. I am a software engineer who builds
              and occasionally design websites and apps. I started this blog to
              keep track of the things I do! Glad you are here!
            </p>
          </div>
          <Button
            type="Primary"
            className="flex items-center justify-center gap-2 transition-all duration-100 ease-in-out hover:scale-105"
            onClick={() => {}}
          >
            <p className="font-medium">Connect</p>
            <ArrowIcon className="h-3 w-3" />
          </Button>
        </section>

        {/* Latest Posts section */}
        <section className="flex w-full flex-col items-start justify-between md:flex-row">
          <div className="illustration">
            <div className="relative hidden h-40 w-60 md:flex">
              <Image
                src="/assets/latest_posts_desktop.svg"
                alt="latestPosts"
                fill
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src="/assets/latest_posts_mobile.svg"
                alt="latestPosts"
                fill
              />
            </div>
          </div>
          <div className="posts w-full md:w-2/3">
            {posts.slice(0, 5).map((item) => (
              <ListCard
                title={item.title}
                slug={item.slug}
                readingTime={item.readingTime.text}
                date={item.date}
                type="blog"
                key={item.slug}
              />
            ))}
          </div>
        </section>

        {/* Latest Snippets section */}
        <section className="flex w-full flex-col items-start justify-between md:flex-row-reverse">
          <div className="illustration">
            <div className="relative hidden h-40 w-60 md:flex">
              <Image
                src="/assets/latest_snippets_desktop.svg"
                alt="latestPosts"
                fill
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src="/assets/latest_snippets_mobile.svg"
                alt="latestPosts"
                fill
              />
            </div>
          </div>
          <div className="posts w-full md:w-2/3">
            {snippets.slice(0, 5).map((item) => (
              <ListCard
                title={item.title}
                slug={item.slug}
                readingTime={item.readingTime.text}
                date={item.date}
                type="blog"
                key={item.slug}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
