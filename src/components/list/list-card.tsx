import { ArrowIcon } from '@/assets/icons';
import Link from 'next/link';
import { CountPrimitive } from '../count';

type PropType = {
  title: string;
  slug: string;
  views?: number;
  readingTime?: string;
  date?: string;
  type: 'blog' | 'snippets' | 'twitter';
  contentType?: string;
};

export default function ListCard({
  title,
  slug,
  readingTime,
  type,
  date,
  contentType,
}: PropType) {
  return (
    <Link
      className="flex w-full items-center justify-between border-b-[1px] border-black border-opacity-5 px-2 py-4 transition-all duration-100 ease-in-out hover:translate-x-2"
      href={
        type === 'blog' ? `${type}/${contentType}/${slug}` : `${type}/${slug}`
      }
    >
      <div className="flex flex-col items-start justify-start gap-3">
        <p className="max-w-xs text-lg font-semibold md:max-w-lg">{title}</p>
        <div className="flex flex-col items-start justify-between gap-2 text-sm opacity-60 md:flex-row md:items-center">
          {date && <span>Posted {date}</span>}
          {date && readingTime && <span className="hidden md:flex"> • </span>}
          {readingTime && <span>{readingTime}</span>}
          {type !== 'twitter' && (
            <span className="hidden gap-2 md:flex">
              <span> • </span>
              <CountPrimitive slug={slug} />
            </span>
          )}
        </div>
        {/* <div className="flex items-center justify-between gap-2">
          {language &&
            language.map((item, idx) => <Badge key={idx + 1} text={item} />)}
        </div> */}
      </div>
      <ArrowIcon className="h-4 w-4 text-black" />
    </Link>
  );
}
