import { allSnippets } from '.contentlayer/generated';
import MDXComponents from '@/components/mdx/MDXComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';

type PropType = { params: { slug: string } };

export default function Snippet({ params }: PropType) {
  const currentSnippet = allSnippets.filter((_) => _.slug === params.slug)[0];
  const Component = useMDXComponent(currentSnippet?.body?.code);

  return (
    <div className="mx-auto max-w-4xl py-48">
      <div className="px-3 md:p-5">
        <div className="pb-5">
          <Link href="/blog">
            <div className="cursor-pointer ">
              <h1 className="my-2 py-2 text-3xl font-semibold sm:text-4xl">
                {currentSnippet.title}
              </h1>
            </div>
          </Link>
          <div className="items-center justify-between xl:flex">
            <h2 className="py-2 text-lg font-medium text-gray-600 dark:text-gray-300">
              {currentSnippet.date}
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
