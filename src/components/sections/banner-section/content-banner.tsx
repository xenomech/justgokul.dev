'use client';
import { ArrowIcon } from '@/assets/icons';
import { Button } from '@/components/button';
import { CountCompound } from '@/components/count';
import { useRouter } from 'next/navigation';

interface ContentBannerProps {
  title: string;
  slug: string;
  date: string;
  readingTime: string;
}
export const ContentBanner = ({
  title,
  slug,
  date,
  readingTime,
}: ContentBannerProps) => {
  const router = useRouter();
  return (
    <div className="pb-2">
      <Button
        className="flex items-center justify-center gap-2"
        variant="navigator"
        onClick={() => router.back()}
      >
        <ArrowIcon className="h-4 w-4 rotate-180" />
        <p>Go Back</p>
      </Button>{' '}
      <h1 className="my-2 pt-4 text-3xl font-semibold sm:text-4xl">{title}</h1>
      <div className="items-center justify-between xl:flex">
        <CountCompound
          slug={slug}
          date={date}
          title={title}
          readingTime={readingTime}
        />
      </div>
    </div>
  );
};
