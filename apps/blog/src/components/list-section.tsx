'use client';
import { convertDateToString } from '@repo/utils';
import { ListCard } from '@repo/ui';
import Link from 'next/link';
import analytics from '@/lib/analytics';

export interface ListSectionItem {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  type?: 'blog' | 'snippets' | 'twitter';
  readingTime?: string;
  views?: number;
}

type ListSectionProps = {
  data: ListSectionItem[];
};

export const ListSection = ({ data }: ListSectionProps) => {
  return (
    <div className="posts dash w-full rounded-lg border-[1px] border-black border-opacity-10 p-4">
      <div className="flex flex-col gap-4">
        {data.map((item: ListSectionItem, index: number) => (
          <Link
            key={index}
            href={`/${item.type}/${item.slug}`}
            onClick={() => {
              analytics.track(`list_item_${item.title}_clicked`, {
                title: item.title,
                slug: item.slug,
                type: item.type,
                views: item.views,
                reading_time: item.readingTime,
              });
            }}
          >
            <ListCard
              title={item.title}
              views={item.views}
              date={item.date && convertDateToString(item.date)}
              readingTime={item.readingTime}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
