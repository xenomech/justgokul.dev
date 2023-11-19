import { ListContainer } from '@/components/containers';
import { BlogBanner } from '@/components/sections';
import { sortFrontMatter } from '@/lib/common/transforms';
import Image from 'next/image';

// TODO: Filter
export default function Blog() {
  const allPosts = sortFrontMatter(allTechnicals).concat(
    sortFrontMatter(allPersonals)
  );
  return (
    <div className="mx-4 max-w-7xl pb-20 pt-14 font-inter lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <BlogBanner numberOfPosts={posts?.length} />
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
          <ListContainer
            type="blog"
            data={posts}
            className="posts dash w-full rounded-lg border-[1px] border-black border-opacity-10 p-4 md:w-3/4"
          />
        </section>
      </div>
    </div>
  );
}
