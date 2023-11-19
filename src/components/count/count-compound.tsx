'use client';
import { convertDateToString } from '@/lib/common/transforms';
import { useEffect } from 'react';
import { CountPrimitive } from './count-primitive';

// TODO: update to a better mobile and desktop design
interface CountCompoundProps {
  slug: string;
  date: string;
  readingTime: string;
  title: string;
}

export const CountCompound = ({
  slug,
  title,
  date,
  readingTime,
}: CountCompoundProps) => {
  useEffect(() => {
    const URL = `/api/page_views/${slug}`;
    if (!sessionStorage.getItem(`page:[${title}]`)) {
      fetch(URL, {
        method: 'POST',
      });
      sessionStorage.setItem(
        `page:[${title}]`,
        JSON.stringify({
          visited: true,
        })
      );
    }
  }, [slug, title]);
  return (
    <div className="flex flex-col gap-1 py-2 text-lg font-medium text-black text-opacity-50 md:flex-row">
      <div className="flex flex-wrap items-center gap-1">
        <p>{convertDateToString(date)}</p>
        <p>{' • '}</p>
        <p>{readingTime}</p>
      </div>
      <p className="hidden md:block">{' • '}</p>
      <div className="flex items-center gap-1">
        <CountPrimitive slug={slug} />
      </div>
    </div>
  );
};
