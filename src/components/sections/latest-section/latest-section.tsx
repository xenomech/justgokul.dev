import { ListCard } from '@/components/list';
import { FrontMatterType } from '@/lib/common';
import Image from 'next/image';

type LatestContentSectionType = {
  type: 'snippets' | 'blog';
  inverse?: boolean;
  data: FrontMatterType[];
};
export const LatestContentSection = ({
  type,
  inverse,
  data,
}: LatestContentSectionType) => {
  return (
    <section
      className={`relative flex w-full flex-col items-start justify-between gap-4 lg:flex-row ${
        inverse && 'lg:flex-row-reverse'
      }`}
    >
      <div className="illustration md:sticky md:top-20">
        <div className="relative hidden h-40 w-60 lg:flex">
          <Image
            src={`https://static.justgokul.dev/assets/latest_${type}_desktop.svg`}
            alt="latestPosts"
            className="object-contain"
            fill
            priority
          />
        </div>
        <div className="relative flex h-36 w-64 lg:hidden">
          <Image
            src={`https://static.justgokul.dev/assets/latest_${type}_mobile.svg`}
            alt="latestPosts"
            className="object-contain"
            fill
            priority
          />
        </div>
      </div>
      <div className="posts dash w-full rounded-md p-4 md:w-[650px]">
        {data.slice(0, 5).map((item) => (
          <ListCard
            title={item.title}
            slug={item.slug}
            readingTime={item.readingTime}
            date={item.date}
            type={type}
            key={item.slug}
          />
        ))}
      </div>
    </section>
  );
};
