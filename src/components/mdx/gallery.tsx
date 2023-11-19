import { cn } from '@/lib/common/utils';
import Image from 'next/image';

type GalleryProps = {
  className?: string;
  srcArray: { url: string; alt: string; className: string }[];
};
export const Gallery = ({ className, srcArray }: GalleryProps) => {
  return (
    <div
      className={cn(
        'mx-auto flex flex-wrap items-center justify-center gap-4',
        className
      )}
    >
      {srcArray?.map((item) => (
        <div
          className="relative flex h-[130px] w-[130px] items-center justify-center md:h-[165px] md:w-[165px]"
          key={item.url}
        >
          <Image
            className="!my-0 rounded-xl bg-cover"
            src={item.url}
            alt={item.alt}
            fill
            priority
          />
        </div>
      ))}
    </div>
  );
};
