import { allSnippets } from '.contentlayer/generated';
import { TWEET_ID } from '@/assets/store';
import { ListContainer } from '@/components/containers';
import { ListCard } from '@/components/list';
import { SnippetsBanner } from '@/components/sections';
import { sortFrontMatter } from '@/lib/common/transforms';
import Image from 'next/image';

export default function Snippets() {
  const snippets = sortFrontMatter(allSnippets);
  return (
    <div className="mx-4 max-w-7xl pb-20 font-inter lg:mx-auto">
      <div className="flex flex-col items-start justify-start gap-9 md:gap-20">
        <SnippetsBanner numberOfPosts={snippets?.length + TWEET_ID?.length} />
        <section className="relative mx-auto flex w-full max-w-4xl flex-col items-start justify-between md:flex-row">
          <div className="illustration md:sticky md:top-20">
            <div className="relative hidden h-40 w-40 md:flex">
              <Image
                src="https://static.justgokul.dev/assets/snippets_desktop.svg"
                alt="snippets"
                className="object-contain"
                fill
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src="https://static.justgokul.dev/assets/snippets_mobile.svg"
                alt="snippets"
                className="object-contain"
                fill
              />
            </div>
          </div>
          <ListContainer type="snippets" data={snippets} />
        </section>

        <section className="mx-auto flex w-full max-w-4xl flex-col items-start justify-between md:flex-row-reverse">
          <div className="illustration">
            <div className="relative hidden h-40 w-36 md:flex">
              <Image
                src="https://static.justgokul.dev/assets/threads_desktop.svg"
                alt="threads"
                className="object-contain"
                fill
              />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image
                src="https://static.justgokul.dev/assets/threads_mobile.svg"
                alt="threads"
                className="object-contain"
                fill
              />
            </div>
          </div>
          <div className="posts dash w-full rounded-lg border-[1px] border-black border-opacity-10 p-4 md:w-3/4">
            {TWEET_ID.map((item) => {
              const idParams = item.id.map((id) => `id=${id}`).join('&');
              return (
                <ListCard
                  key={item.slug}
                  title={item.title}
                  slug={`?${idParams}`}
                  type="tweets"
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
