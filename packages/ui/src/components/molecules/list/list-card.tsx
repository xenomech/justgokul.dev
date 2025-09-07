import { MoveRight } from 'lucide-react';

type PropType = {
  title: string;
  views?: number;
  readingTime?: string;
  date?: string;
  showViewCount?: boolean;
};

export default function ListCard({
  title,
  readingTime,
  date,
  showViewCount = false,
  views,
}: PropType) {
  return (
    <div className="flex w-full items-center justify-between border-b-[1px] border-black border-opacity-5 px-2 py-4 text-left transition-all duration-200 ease-out hover:translate-x-2">
      <div className="flex flex-col items-start justify-start gap-3">
        <p className="max-w-xs text-lg font-semibold md:max-w-lg">{title}</p>
        <div className="flex flex-col items-start justify-between gap-2 text-sm opacity-60 md:flex-row md:items-center">
          {date && <span>Posted {date}</span>}
          {date && readingTime && <span className="hidden md:flex"> • </span>}
          {readingTime && <span>{readingTime}</span>}
          {showViewCount && views !== undefined && (
            <span className="hidden gap-2 md:flex">
              <span> • </span>
              <span>{views} views</span>
            </span>
          )}
        </div>
      </div>
      <MoveRight className="h-4 w-4 text-black" />
    </div>
  );
}
