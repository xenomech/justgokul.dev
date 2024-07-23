import { allPosts } from '.contentlayer/generated';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { CountCompound } from '@/components/count';
import { MDXComponents } from '@/components/mdx';
import { useMDXComponent } from 'next-contentlayer/hooks';

type PropType = { params: { slug: string } };

export default function Post({ params }: PropType) {
  const currentPost = allPosts.filter(
    (_: { slug: string }) => _.slug === params.slug
  )[0];
  const Component = useMDXComponent(currentPost.body.code);
  return (
    <div className="mx-4 max-w-4xl py-48 md:mx-auto">
      <div className="px-3 md:p-5">
        <div className="pb-2">
          <Button
            className="flex items-center justify-center gap-2"
            type="Navigator"
            action="Navigate"
            url="/blog"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
            <p>Go Back</p>
          </Button>
          <h1 className="my-2 pt-4 text-3xl font-semibold sm:text-4xl">
            {currentPost.title}
          </h1>

          <div className="items-center justify-between xl:flex">
            <CountCompound slug={params.slug} data={currentPost} />
          </div>
        </div>
        <article className="dark:prose-dark prose min-w-full py-2 xl:prose-xl">
          <Component components={MDXComponents} />
        </article>
      </div>
    </div>
  );
}
