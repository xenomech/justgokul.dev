'use client';

import { GridCard } from '@repo/ui';
import { useRouter } from 'next/navigation';
import CountPrimitive from './count-primitive';
import { type StoryContent } from '@/lib/common';
import { StoryCardFactory, type CardType, type CardHandlers } from './story-cards';
import analytics from '@/lib/analytics';

export interface GridSectionItem extends StoryContent {
  views?: number;
}

type GridSectionProps = {
  data: GridSectionItem[];
  basePath: string;
};

export const GridSection = ({ data, basePath }: GridSectionProps) => {
  const router = useRouter();

  return (
    <div className="posts w-full p-4">
      <div className="grid grid-cols-1 place-items-center items-center justify-center gap-10 md:grid-cols-2 xl:grid-cols-3">
        {data.map((item: GridSectionItem, index: number) => {
          const handleOnCardClick = () => {
            analytics.track(`grid_custom_card_item_${item.title}_clicked`, {
              title: item.title,
              slug: item.slug,
              type: basePath.replace('/', ''),
              views: item.views,
              reading_time: item.readingTime,
            });
            router.push(`${basePath}/${item.slug}`);
          };
          const handleOnClick = () => {
            analytics.track(`grid_default_card_item_${item.title}_clicked`, {
              title: item.title,
              slug: item.slug,
              type: basePath.replace('/', ''),
              views: item.views,
              reading_time: item.readingTime,
            });
            router.push(`${basePath}/${item.slug}`);
          };

          const handlers: CardHandlers = {
            onClick: () => handleOnCardClick(),
          };

          const { component: CardComponent, props: cardProps } =
            StoryCardFactory.createCardWithFallback(item.cardType, item, handlers);

          return (
            <GridCard
              key={index}
              title={item.title}
              slug={item.slug}
              views={item.views}
              excerpt={item.excerpt}
              date={item.date}
              readingTime={item.readingTime}
              lookupImages={item.lookupImages}
              CountComponent={<CountPrimitive slug={item.slug} count={item.views} />}
              onClick={handleOnClick}
              customCard={{
                component: CardComponent,
                props: cardProps,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
