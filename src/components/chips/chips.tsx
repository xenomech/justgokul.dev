import { OpenExternal } from '@/assets/icons';
import { cn } from '@/lib/common/utils';
import Link from 'next/link';

interface ChipsProps {
  className?: string;
  title: string;
  url: string;
}
export const Chips = ({ className, url, title }: ChipsProps) => {
  return (
    <Link href={url} target="_blank">
      <div
        className={cn(
          'flex items-center justify-center gap-4 rounded-lg border-[1px] border-black border-opacity-10 bg-base-100 px-3 py-2 transition-all duration-150 ease-in-out hover:scale-105',
          className
        )}
      >
        <div className="flex items-center justify-center gap-2">
          <p className="font-medium capitalize">{title}</p>
        </div>
        <OpenExternal className="h-4 w-4 text-black text-opacity-60" />
      </div>
    </Link>
  );
};
