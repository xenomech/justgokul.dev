import { allSnippets } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { MDXComponents } from '@/components/mdx';
import { convertDateToString } from '@/lib/common';
import { getMDXComponent } from 'next-contentlayer/hooks';

type PropType = { params: { slug: string } };

export default function Snippet({ params }: PropType) {
  const currentSnippet = allSnippets.filter((_) => _.slug === params.slug)[0];
  const Component = getMDXComponent(currentSnippet.body.code);

  return (
    <div className="mx-4 max-w-4xl py-48 md:mx-auto">
      <div className="px-3 md:p-5">
        <div className="pb-5">
          <Button
            className="flex items-center justify-center gap-2"
            type="Navigator"
            action="Back"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            <p>Go Back</p>
          </Button>
          <h1 className="my-2 pt-4 text-3xl font-semibold sm:text-4xl">
            {currentSnippet.title}
          </h1>

          <div className="items-center justify-between xl:flex">
            <h2 className="py-2 text-lg font-medium text-black text-opacity-50">
              {convertDateToString(currentSnippet.date)}
              {' • '}
              {currentSnippet.readingTime.text}
            </h2>
          </div>
        </div>
        <article className="dark:prose-dark prose min-w-full py-2 xl:prose-xl">
          <Component components={MDXComponents} />
        </article>
      </div>
    </div>
  );
}
