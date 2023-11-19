import { ListCard } from '@/components/list';
import { FrontMatterType } from '@/lib/common/transforms';
import { cn } from '@/lib/common/utils';

interface ListContainerProps {
  className?: string;
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
}
export const ListContainer = ({
  data,
  type,
  className,
}: ListContainerProps) => {
  return (
    <div className={cn(className)}>
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
