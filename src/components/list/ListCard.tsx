import { ArrowIcon } from '@/assets/icons';
import Link from 'next/link';

type PropType = {
  title: string;
  slug: string;
  views?: number;
  readingTime: string;
  date: string;
  type: string;
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
        <p className="font-inter text-lg font-semibold">{title}</p>
        <p className="text-sm opacity-60">
          Posted {date} • {readingTime}
        </p>
      </div>
      <ArrowIcon className="h-4 w-4 text-black" />
    </Link>
  );
}