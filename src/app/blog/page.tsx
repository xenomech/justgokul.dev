import { allPersonals, allTechnicals } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { ListSection } from '@/components/section/list-section';
import { sortFrontMatter } from '@/lib/common';
import Image from 'next/image';

// TODO: Filter
export default function Blog() {
  const allPosts = sortFrontMatter(allTechnicals).concat(
    sortFrontMatter(allPersonals)
  );
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
            <div className="flex items-center gap-2">
              <h1 className="heading">Blog</h1>
              <p className="-mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 bg-base-100 p-2 font-semibold leading-none  ">
                {allPosts?.length}
              </p>
            </div>
            <p className="subheading max-w-2xl">
              Sharing my thoughts and creating documentations across various
              subjects such as design, development and everything in between.
            </p>
          </div>
        </section>
        <section className="relative mx-auto flex w-full max-w-4xl flex-col items-start justify-between md:flex-row lg:-mt-56 lg:ml-80">
          <div className="illustration md:sticky md:top-20">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image
                src="https://static.justgokul.dev/assets/posts_desktop.svg"
                alt="latestPosts"
                className="object-contain"
                fill
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src="https://static.justgokul.dev/assets/posts_mobile.svg"
                alt="latestPosts"
                className="object-contain"
                fill
              />
            </div>
          </div>
          <ListSection type="blog" data={allPosts} />
        </section>
      </div>
    </div>
  );
}
