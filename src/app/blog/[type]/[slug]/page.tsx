import { MDXComponents } from '@/components/mdx';
import { ContentBanner } from '@/components/sections';
import { useMDXComponent } from 'next-contentlayer/hooks';

type PropType = { params: { slug: string; type: string } };

export default function Post({ params }: PropType) {
  const currentPost = allDocuments.filter(
    (_: { slug: string }) => _.slug === params.slug
  )[0];
  console.log(typeof currentPost.readingTime);
  const Component = useMDXComponent(currentPost.body.code);
  return (
    <div className="mx-4 max-w-4xl py-48 md:mx-auto">
      <div className="px-3 md:p-5">
        <ContentBanner
          title={currentPost?.title}
          slug={currentPost?.slug}
          date={currentPost.date}
          readingTime={currentPost.readingTime.text}
        />
        <article className="dark:prose-dark prose min-w-full py-2 xl:prose-xl">
          <Component components={MDXComponents} />
        </article>
      </div>
    </div>
  );
}
