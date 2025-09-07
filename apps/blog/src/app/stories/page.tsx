import { allStories } from '.contentlayer/generated';
import { GridSection } from '@/components/grid-section';
import { transformAndSortStories } from '@/lib/common';
import { Button } from '@repo/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function Stories() {
  const posts = transformAndSortStories(allStories);
  return (
    <div className="font-inter mx-4 py-40">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="flex w-full max-w-4xl flex-col items-start justify-center gap-4 lg:mx-auto">
          <div className="flex flex-col items-start justify-start gap-6">
            <Link href="/">
              <Button variant="back" leftIcon={<MoveRight className="h-4 w-4 rotate-180" />}>
                Go Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="heading">Stories</h1>
              <p className="bg-base-100 -mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 p-2 font-semibold leading-none">
                {posts?.length}
              </p>
            </div>
            <p className="subheading">
              A collection of visual stories and narratives. Capturing moments, experiences, and
              meaningful compositions.
            </p>
          </div>
        </section>
        <section className="relative mx-auto w-full max-w-7xl lg:mx-auto">
          <GridSection basePath="/stories" data={posts} />
        </section>
      </div>
    </div>
  );
}
