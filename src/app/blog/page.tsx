'use client';
import { allPosts } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import Button from '@/components/button/Button';
import ListCard from '@/components/list/ListCard';
import { sortFrontMatter } from '@/lib/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Blog() {
  const posts = sortFrontMatter(allPosts);
  const router = useRouter();
  return (
    <div className="mx-4 max-w-4xl py-48 lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-28">
        <section className="flex flex-col items-start justify-start gap-8">
          <div className="flex flex-col items-start justify-start gap-6">
            <Button
              className="flex items-center justify-center gap-2"
              type="Navigator"
              onClick={() => {
                router.back();
              }}
            >
              <ArrowIcon className="h-4 w-4 rotate-180" />
              <p>Go Back</p>
            </Button>
            <h1 className="heading">Blog</h1>
            <p className="subheading">
              Sharing my thoughts and creating documentations across various
              subjects such as design, development and everything in between.
            </p>
          </div>
        </section>

        <section className="mx-auto flex max-w-3xl flex-col items-start justify-between md:flex-row">
          <div className="illustration">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image src="/assets/posts_desktop.svg" alt="latestPosts" fill />
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
            {posts.map((item) => (
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
