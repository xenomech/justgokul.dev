import { allSnippets } from '.contentlayer/generated';
import { MDXComponents } from '@/components/mdx';
import { ContentBanner } from '@/components/sections';
import { getMDXComponent } from 'next-contentlayer/hooks';

type PropType = { params: { slug: string } };

export default function Snippet({ params }: PropType) {
  const currentSnippet = allSnippets.filter((_) => _.slug === params.slug)[0];
  const Component = getMDXComponent(currentSnippet.body.code);

  return (
    <div className="mx-4 max-w-4xl py-48 md:mx-auto">
      <div className="px-3 md:p-5">
        <ContentBanner
          title={currentSnippet?.title}
          slug={currentSnippet?.slug}
          date={currentSnippet.date}
          readingTime={currentSnippet.readingTime.text}
        />
        <article className="dark:prose-dark prose min-w-full py-2 xl:prose-xl">
          <Component components={MDXComponents} />
        </article>
      </div>
    </div>
  );
}
