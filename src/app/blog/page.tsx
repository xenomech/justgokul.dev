import { allPosts } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import Button from '@/components/button/Button';
import ListCard from '@/components/list/ListCard';
import { sortFrontMatter } from '@/lib/common';
import Image from 'next/image';

export default function Blog() {
  const posts = sortFrontMatter(allPosts);
  return (
    <div className="mx-4 max-w-7xl pb-20 pt-14 font-inter lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="blog-banner flex w-full flex-col items-start justify-center gap-8 pt-36 lg:pb-48">
          <div className="flex flex-col items-start justify-start gap-6 lg:ml-56">
            <Button
              className="flex items-center justify-center gap-2"
              type="Navigator"
              action="Back"
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
              <p>Go Back</p>
            </Button>
            <h1 className="heading">Blog</h1>
            <p className="subheading max-w-2xl">
              Sharing my thoughts and creating documentations across various
              subjects such as design, development and everything in between.
            </p>
          </div>
        </section>
        <section className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between md:flex-row lg:-mt-56 lg:ml-80">
          <div className="illustration">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image
                src="https://static.justgokul.dev/assets/posts_desktop.svg"
                alt="latestPosts"
                fill
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src="https://static.justgokul.dev/assets/posts_mobile.svg"
                alt="latestPosts"
                fill
              />
            </div>
          </div>
          <div className="posts w-full md:w-2/3">
            {posts.map((item) => (
              <ListCard
                title={item.title}
                slug={item.slug}
                readingTime={item.readingTime}
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
