import { allSnippets } from '.contentlayer/generated';
import { MDXComponents, Button } from '@repo/ui';
import { convertDateToString } from '@repo/utils';
import { getMDXComponent } from 'next-contentlayer2/hooks';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import CountPrimitive from '@/components/count-primitive';
import { ViewTracker } from '@/components/view-track';

type PropType = { params: { slug: string } };

export default function Snippet({ params }: PropType) {
  const { slug } = params;
  const currentSnippet = allSnippets.filter(_ => _.slug === slug)[0];

  if (!currentSnippet) {
    return <div>Snippet not found</div>;
  }

  const Component = getMDXComponent(currentSnippet.body.code);

  return (
    <div className="mx-4 max-w-4xl py-48 md:mx-auto">
      <ViewTracker slug={slug} title={currentSnippet.title} />
      <div className="px-3 md:p-5">
        <div className="pb-5">
          <Link href="/snippets">
            <Button
              variant="back"
              className="mb-4"
              leftIcon={<MoveRight className="h-4 w-4 rotate-180" />}
            >
              Go Back
            </Button>
          </Link>
          <h1 className="my-2 pt-4 text-3xl font-semibold sm:text-4xl">{currentSnippet.title}</h1>

          <div className="flex flex-col gap-1 py-2 text-lg font-medium text-black text-opacity-50 md:flex-row">
            <div className="flex flex-wrap items-center gap-1">
              <p>{convertDateToString(currentSnippet.date)}</p>
              <p>{' • '}</p>
              <p>{currentSnippet.readingTime.text}</p>
            </div>
            <p className="hidden md:block">{' • '}</p>
            <div className="flex items-center gap-1">
              <CountPrimitive slug={slug} count={0} />
            </div>
          </div>
        </div>
        <article className="dark:prose-dark prose xl:prose-xl min-w-full py-2">
          <Component components={MDXComponents} />
        </article>
      </div>
    </div>
  );
}
