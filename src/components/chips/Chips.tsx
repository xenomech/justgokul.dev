import { OpenExternal } from '@/assets/icons';
import classNames from 'classnames';
import Link from 'next/link';

type PropType = {
  className?: string;
  title: string;
  url: string;
};
export default function Chips({ className, url, title }: PropType) {
  return (
    <Link href={url} target="_blank">
      <div
        className={classNames(
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
}
