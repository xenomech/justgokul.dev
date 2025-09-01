import classNames from 'classnames';
import Image from 'next/image';

interface GalleryImage {
  url: string;
  alt: string;
  className: string;
}

interface GalleryProps {
  className?: string;
  srcArray: GalleryImage[];
}

export default function Gallery({ className, srcArray }: GalleryProps) {
  if (!srcArray || srcArray.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(
        'mx-auto flex flex-wrap items-center justify-center gap-4',
        className
      )}
    >
      {srcArray.map((item) => (
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
}
