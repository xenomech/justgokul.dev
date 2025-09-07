import { allPosts } from '.contentlayer/generated';
import { ListSection } from '@/components/list-section';
import { transformAndSortPosts } from '@/lib/common';
import { Button } from '@repo/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Blog() {
  const posts = transformAndSortPosts(allPosts);
  return (
    <div className="font-inter mx-4 py-40 md:mx-auto md:max-w-xl lg:mx-auto lg:max-w-4xl">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex flex-col items-start justify-start gap-6">
            <Link href="/">
              <Button variant="back" leftIcon={<MoveRight className="h-4 w-4 rotate-180" />}>
                Go Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="heading">Blog</h1>
              <p className="bg-base-100 -mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 p-2 font-semibold leading-none">
                {posts?.length}
              </p>
            </div>
            <p className="subheading">
              Sharing my thoughts and creating documentations across various subjects such as
              design, development and everything in between.
            </p>
          </div>
        </section>
        <section className="relative mx-auto flex w-full flex-col items-start justify-between md:flex-row">
          <div className="illustration md:sticky md:top-20">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image src="/assets/posts_desktop.svg" alt="latestPosts" fill />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image src="/assets/posts_mobile.svg" alt="latestPosts" fill />
            </div>
          </div>
          <ListSection
            data={posts.map(item => ({
              title: item.title,
              slug: item.slug,
              excerpt: item.category,
              date: item.date,
              type: 'blog' as const,
              readingTime: item.readingTime,
            }))}
          />
        </section>
      </div>
    </div>
  );
}
