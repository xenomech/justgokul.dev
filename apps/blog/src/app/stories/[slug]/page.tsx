import { allStories } from '.contentlayer/generated';
import CountPrimitive from '@/components/count-primitive';
import { MDXComponents, Button } from '@repo/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { convertDateToString } from '@repo/utils';

type PropType = { params: { slug: string } };

export default function Post({ params }: PropType) {
  const currentPost = allStories.filter((_: { slug: string }) => _.slug === params.slug)[0];

  if (!currentPost) {
    return <div>Post not found</div>;
  }

  const Component = useMDXComponent(currentPost.body.code);
  return (
    <div className="mx-4 max-w-4xl py-48 md:mx-auto">
      <div className="px-3 md:p-5">
        <div className="pb-2">
          <Link href="/stories">
            <Button variant="back" leftIcon={<MoveRight className="h-4 w-4 rotate-180" />}>
              Go Back
            </Button>
          </Link>
          <h1 className="my-2 pt-4 text-5xl font-semibold sm:text-4xl">{currentPost.title}</h1>

          <div className="flex flex-col gap-1 py-2 text-lg font-medium text-black text-opacity-50 md:flex-row">
            <div className="flex flex-wrap items-center gap-1">
              <p>{convertDateToString(currentPost.date)}</p>
              <p>{' • '}</p>
              <p>{currentPost.readingTime.text}</p>
            </div>
            <p className="hidden md:block">{' • '}</p>
            <div className="flex items-center gap-1">
              <CountPrimitive slug={params.slug} count={0} />
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
