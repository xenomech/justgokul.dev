'use client';

import useSWR from 'swr';

type CountPrimitiveProps = {
  slug?: string;
  count?: number;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CountPrimitive({ slug, count }: CountPrimitiveProps) {
  const { data, isLoading } = useSWR(slug ? `/api/page_views/${slug}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const displayCount = count !== undefined ? count : data?.views;

  if (displayCount === null || displayCount === undefined) {
    return null;
  }

  return (
    <div className="flex items-center gap-1">
      <span className={isLoading ? 'animate-pulse' : ''}>{isLoading ? ' • ' : displayCount}</span>
      <span>views</span>
    </div>
  );
}
