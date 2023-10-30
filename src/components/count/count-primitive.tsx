'use client';
import useSWR from 'swr';

function CountPrimitive({ slug }: { slug: string }) {
  const { data, isLoading } = useSWR(
    `/api/page_views/${slug}`,
    async (input) => {
      const res = await fetch(input);
      return res.json();
    }
  );

  return (
    <div>
      {isLoading && <p className="mr-1 animate-pulse ">•</p>}
      {data && <p className="mr-1 ">{data?.views?.toLocaleString()} views</p>}
    </div>
  );
}

export default CountPrimitive;
