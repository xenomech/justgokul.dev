import { GridCard } from '@/components/grid';
import { FrontMatterType } from '@/lib/common';

type GridSectionType = {
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
};
export const GridSection = ({ data, type }: GridSectionType) => {
  console.log(data);
  return (
    <div className="posts w-full p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center justify-center items-center">
        {data.map((item: FrontMatterType) => (
          <GridCard
            title={item.title}
            slug={item.slug}
            readingTime={item.readingTime}
            date={item.date}
            type={type}
            key={item.slug}
            lookupImages={item.lookupImages ?? []}
          />
        ))}
      </div>
    </div>
  );
};
