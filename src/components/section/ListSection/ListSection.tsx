import ListCard from '@/components/list/ListCard';
import { FrontMatterType } from '@/lib/common';

type ListSectionType = {
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
};
export const ListSection = ({ data, type }: ListSectionType) => {
  return (
    <div className="posts dash w-full rounded-lg border-[1px] border-black border-opacity-10 p-4 md:w-3/4">
      <div>
        {data.map((item: FrontMatterType) => (
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
    </div>
  );
};
