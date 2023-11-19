'use client';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { useRouter } from 'next/navigation';

interface SnippetsBannerProps {
  numberOfPosts: number;
}
export const SnippetsBanner = ({ numberOfPosts }: SnippetsBannerProps) => {
  const router = useRouter();
  return (
    <section className="snippet-banner flex w-full flex-col items-start justify-center gap-8 pt-36 lg:pb-44 lg:pt-52">
      <div className="flex flex-col items-start justify-start gap-6 lg:ml-56">
        <Button
          className="flex items-center justify-center gap-2"
          variant="navigator"
          onClick={() => router.back()}
        >
          <ArrowIcon className="h-4 w-4 rotate-180" />
          <p>Go Back</p>
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="heading">Snippets & Threads</h1>
          <p className="-mt-9 flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-black border-opacity-30 bg-base-100 p-2 font-semibold leading-none  ">
            {numberOfPosts}
          </p>
        </div>
        <p className="subheading max-w-2xl">
          Sharing small snippets and tweet threads that helped me automate or
          understand simple concepts.
        </p>
      </div>
    </section>
  );
};
