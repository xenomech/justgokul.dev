import { ListCard } from '@/components/list';
import { FrontMatterType } from '@/lib/common/transforms';

interface ListContainerProps {
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
}
export const ListContainer = ({ data, type }: ListContainerProps) => {
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
