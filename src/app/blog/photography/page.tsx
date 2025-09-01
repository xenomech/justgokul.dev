import { allPhotographies } from '.contentlayer/generated';
import { Button } from '@/components/button';
import { GridSection } from '@/components/section/grid-section';
import { sortFrontMatter } from '@/lib/common';
import { MoveRight } from 'lucide-react';

export default function Photography() {
  const posts = sortFrontMatter(allPhotographies);
  return (
    <div className="mx-4 max-w-7xl pb-20 pt-14 font-inter lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="flex w-full flex-col items-start justify-center gap-8 pt-36">
          <div className="flex flex-col items-start justify-start gap-6 lg:ml-56">
            <Button
              className="flex items-center justify-center gap-2"
              type="Navigator"
              action="Back"
            >
              <MoveRight className="h-4 w-4 rotate-180" />
              <p>Go Back</p>
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="heading">Photography</h1>

              <p className="-mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 bg-base-100 p-2 font-semibold leading-none  ">
                {posts?.length}
              </p>
            </div>
            <p className="subheading max-w-2xl">
              A collection of my photography work and visual stories. Capturing
              moments, landscapes, and compositions.
            </p>
          </div>
        </section>
        <section className="relative mx-auto w-full">
          <GridSection type="blog" data={posts} />
        </section>
      </div>
    </div>
  );
}
