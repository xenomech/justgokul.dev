import { ArrowIcon } from '@/assets/icons';
import Link from 'next/link';

type PropType = {
  title: string;
  slug: string;
  views?: number;
  readingTime?: string;
  date?: string;
  type?: string;
};
export default function ListCard({
  title,
  slug,
  readingTime,
  type,
  date,
}: PropType) {
  return (
    <Link
      className="flex w-full items-center justify-between border-b-[1px] border-black border-opacity-5 px-2 py-4 transition-all duration-100 ease-in-out hover:translate-x-2"
      href={`${type}/${slug}`}
    >
      <div className="flex flex-col items-start justify-start gap-3">
        <p className="max-w-lg truncate text-lg font-semibold">{title}</p>
        <p className="flex flex-col items-start justify-between gap-2 text-sm opacity-60 md:flex-row md:items-center">
          {date && <span>Posted {date}</span>}
          {date && readingTime && <span className="hidden md:flex"> • </span>}
          {readingTime && <span>{readingTime}</span>}
        </p>
      </div>
      <ArrowIcon className="h-4 w-4 text-black" />
    </Link>
  );
}
