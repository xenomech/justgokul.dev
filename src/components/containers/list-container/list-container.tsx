import { CONTENT_TYPE } from '@/assets/store';
import { ListCard } from '@/components/list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
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
        <Tabs className="md:h-[800px]" defaultValue={CONTENT_TYPE.TECHNICAL}>
          <TabsList className="flex gap-2">
            {Object.values(CONTENT_TYPE).map((item) => (
              <TabsTrigger className="capitalize" key={item} value={item}>
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
          {data.map((item: FrontMatterType) => (
            <TabsContent value={item.contentType} key={item.slug}>
              <ListCard
                key={item.slug}
                title={item.title}
                slug={item.slug}
                readingTime={item.readingTime}
                date={item.date}
                type={type}
                contentType={item.contentType}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
