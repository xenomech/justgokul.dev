import { allSnippets } from '.contentlayer/generated';
import { Button } from '@/components/button';
import { ListSection } from '@/components/section';
import { sortFrontMatter } from '@/lib/common';
import { MoveRight } from 'lucide-react';
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
              <MoveRight className="h-4 w-4 rotate-180" />
              <p>Go Back</p>
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="heading">Snippets</h1>
              <p className="-mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 bg-base-100 p-2 font-semibold leading-none  ">
                {snippets?.length}
              </p>
            </div>
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
          <ListSection type="snippets" data={snippets} />
        </section>
      </div>
    </div>
  );
}
