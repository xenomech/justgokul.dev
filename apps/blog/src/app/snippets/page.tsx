import { allSnippets } from '.contentlayer/generated';
import { ListSection } from '@/components/list-section';
import { transformAndSortSnippets } from '@/lib/common';
import { Button } from '@repo/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ViewTracker } from '@/components/view-track';

export default function Snippets() {
  const snippets = transformAndSortSnippets(allSnippets);
  return (
    <div className="font-inter mx-4 max-w-4xl py-40 lg:mx-auto">
      <ViewTracker slug="snippets" title="Snippets" />
      <div className="flex flex-col items-start justify-start gap-9 md:gap-28">
        <section className="flex w-full flex-col items-start justify-center gap-4">
          <div className="flex flex-col items-start justify-start gap-6">
            <Link href="/">
              <Button variant="back" leftIcon={<MoveRight className="h-4 w-4 rotate-180" />}>
                Go Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <h1 className="heading">Snippets</h1>
              <p className="bg-base-100 -mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 p-2 font-semibold leading-none">
                {snippets?.length}
              </p>
            </div>
            <p className="subheading">
              Sharing small snippets and tweet threads that helped me automate or understand simple
              concepts.
            </p>
          </div>
        </section>
        <section className="relative mx-auto flex w-full flex-col items-start justify-between md:flex-row">
          <div className="illustration md:sticky md:top-20">
            <div className="relative hidden h-36 w-40 md:flex">
              <Image src="/assets/snippets_desktop.svg" alt="snippets" fill />
            </div>
            <div className="relative flex h-40 w-60 md:hidden">
              <Image src="/assets/snippets_mobile.svg" alt="snippets" fill />
            </div>
          </div>
          <ListSection
            data={snippets.map(item => ({
              title: item.title,
              slug: item.slug,
              excerpt: item.category,
              date: item.date,
              type: 'snippets' as const,
              readingTime: item.readingTime,
            }))}
          />
        </section>
      </div>
    </div>
  );
}
