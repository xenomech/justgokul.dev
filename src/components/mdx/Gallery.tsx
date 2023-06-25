import classNames from 'classnames';
import Image from 'next/image';

type PropType = {
  className?: string;
  srcArray: { url: string; alt: string; className: string }[];
};
export default function Gallery({ className, srcArray }: PropType) {
  return (
    <div
      className={classNames(
        'mx-auto flex items-center justify-center gap-4',
        className
      )}
    >
      {srcArray?.map((item) => (
        <div
          className="relative flex h-[165px] w-[165px] items-center justify-center"
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
