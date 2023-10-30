'use client';
import { Post, Snippet } from '.contentlayer/generated';
import { convertDateToString } from '@/lib/common';
import React from 'react';
import CountPrimitive from './count-primitive';

// TODO: update to a better mobile and desktop design

function CountCompound({ slug, data }: { slug: string; data: Post | Snippet }) {
  React.useEffect(() => {
    const URL = `/api/page_views/${slug}`;
    if (!sessionStorage.getItem(`page:[${data.title}]`)) {
      fetch(URL, {
        method: 'POST',
      });
      sessionStorage.setItem(
        `page:[${data.title}]`,
        JSON.stringify({
          visited: true,
        })
      );
    }
  }, [slug, data]);
  return (
    <div className="flex flex-col gap-1 py-2 text-lg font-medium text-black text-opacity-50 md:flex-row">
      <div className="flex flex-wrap items-center gap-1">
        <p>{convertDateToString(data.date)}</p>
        <p>{' • '}</p>
        <p>{data.readingTime.text}</p>
      </div>
      <p className="hidden md:block">{' • '}</p>
      <div className="flex items-center gap-1">
        <CountPrimitive slug={slug} />
      </div>
    </div>
  );
}

export default CountCompound;
