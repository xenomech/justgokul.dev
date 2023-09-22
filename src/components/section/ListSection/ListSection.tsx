'use client';
import ListCard from '@/components/list/ListCard';
import { FrontMatterType } from '@/lib/common';
import { useEffect, useState } from 'react';
type ListSectionType = {
  data: FrontMatterType[];
  type: 'blog' | 'snippets';
};
export const ListSection = ({ data, type }: ListSectionType) => {
  const [renderList, setRenderList] = useState<FrontMatterType[]>(data);
  const [filter, setFilter] = useState<string[]>([]);

  const curatedLang = data
    .map((item) => item.language)
    .flat(Infinity) as string[];
  const filterOptions = curatedLang.filter(
    (item, idx) => curatedLang.indexOf(item) === idx
  );
  useEffect(() => {
    if (filter.length > 0) {
      setRenderList(
        data.filter((item) =>
          item.language.some((item) => filter.indexOf(item) !== -1)
        )
      );
    } else {
      setRenderList(data);
    }
  }, [data, filter]);

  return (
    <div className="posts dash w-full rounded-lg border-[1px] border-black border-opacity-10 p-4 md:w-3/4">
      <div className="item-center flex gap-2">
        {filterOptions.map((item, idx) => (
          <div
            key={idx}
            className="cursor-pointer  px-2"
            onClick={() =>
              setFilter(
                filter.includes(item)
                  ? filter.filter((element) => element !== item)
                  : [...filter, item]
              )
            }
          >
            {item}
          </div>
        ))}
      </div>
      <div>
        {renderList.map((item) => (
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
