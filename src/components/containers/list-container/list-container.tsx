import { CONTENT_TYPE } from '@/assets/store';
import { ListCard } from '@/components/list';
import { FrontMatterType } from '@/lib/common/transforms';

interface ListContainerProps {
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
}
export const ListContainer = ({ data, type }: ListContainerProps) => {
  return (
    <div className="posts dash min-h-full w-full rounded-lg border-[1px] border-black border-opacity-10 p-4 md:w-3/4">
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
