'use client';

import classNames from 'classnames';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ImageGridImage {
  url: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'wide' | 'tall' | 'auto';
  priority?: boolean;
  objectPosition?:
    | 'object-center'
    | 'object-top'
    | 'object-bottom'
    | 'object-left'
    | 'object-right'
    | 'object-top-left'
    | 'object-top-right'
    | 'object-bottom-left'
    | 'object-bottom-right';
}

interface ImageGridProps {
  className?: string;
  images: ImageGridImage[];
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  showCaptions?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
  tall: 'aspect-[2/3]',
  auto: 'aspect-auto',
};

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const masonryColumns = {
  1: 'columns-1',
  2: 'columns-1 md:columns-2',
  3: 'columns-1 md:columns-2 lg:columns-3',
  4: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4',
};

interface ImageCardProps {
  image: ImageGridImage;
  index: number;
  showCaptions: boolean;
}

function ImageCard({ image, index, showCaptions }: ImageCardProps) {
  const aspectRatio = image.aspectRatio || 'auto';

  return (
    <div
      className={classNames(
        'relative mb-4 break-inside-avoid rounded-xl',
        aspectRatio !== 'auto' && aspectRatioClasses[aspectRatio],
        'transition-all duration-200 ease-in-out hover:shadow-lg',
        image.className
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className={classNames('rounded-xl object-cover', image.objectPosition || 'object-center')}
          style={{ margin: 0 }}
          priority={image.priority || index < 2}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>

      {showCaptions && image.alt && (
        <div className="absolute inset-x-0 bottom-0 z-10 rounded-b-xl bg-gradient-to-t from-black/70 to-transparent p-3">
          <p className="text-sm font-medium text-white">{image.alt}</p>
        </div>
      )}
    </div>
  );
}

export default function ImageGrid({
  className,
  images,
  columns = 2,
  gap = 'md',
  showCaptions = false,
}: ImageGridProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(
        'image-grid',
        'w-full',
        masonryColumns[columns],
        gapClasses[gap],
        className
      )}
    >
      {images.map((image, index) => (
        <ImageCard
          key={`${image.url}-${index}`}
          image={image}
          index={index}
          showCaptions={showCaptions}
        />
      ))}
    </div>
  );
}
