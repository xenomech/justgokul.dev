import { ListCard } from '@/components/list';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
import { FrontMatterType } from '@/lib/common';

type ListSectionType = {
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
};
export const ListSection = ({ data, type }: ListSectionType) => {
  return (
    <div className="posts dash w-full rounded-lg border-[1px] border-black border-opacity-10 p-4 md:w-3/4">
      <div>
        <Tabs className="h-[550px]" defaultValue="technical">
          <TabsList>
            <TabsTrigger value={'technical'}>tech</TabsTrigger>
            <TabsTrigger value={'personal'}>personal</TabsTrigger>
          </TabsList>
          {data.map((item: FrontMatterType) => (
            <TabsContent value={item.contentType} key={item.slug}>
              <ListCard
                title={item.title}
                slug={item.slug}
                readingTime={item.readingTime}
                date={item.date}
                type={type}
                contentType={item.contentType}
                key={item.slug}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};
