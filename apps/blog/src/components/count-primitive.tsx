'use client';

import useSWR from 'swr';

type CountPrimitiveProps = {
  slug?: string;
  count?: number;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function CountPrimitive({ slug }: CountPrimitiveProps) {
  const { data, isLoading } = useSWR(slug ? `/api/page_views/${slug}` : null, fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  return (
    <div className="flex items-center gap-1">
      <span className={isLoading ? 'animate-pulse' : ''}>{isLoading ? ' • ' : data?.views}</span>
      <span>views</span>
    </div>
  );
}
