import Image from 'next/image';

interface PhotoGalleryImage {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?:
    | 'object-left-top'
    | 'object-top'
    | 'object-right-top'
    | 'object-left'
    | 'object-center'
    | 'object-right'
    | 'object-left-bottom'
    | 'object-bottom'
    | 'object-right-bottom';
}

interface PhotoGalleryConfig {
  images: PhotoGalleryImage[];
  rotations?: string[];
  containerClasses?: string;
  imageClasses?: string;
  gap?: string;
}

const DEFAULT_ROTATIONS = [
  'rotate-2',
  '-rotate-2',
  'rotate-2',
  'rotate-2',
  '-rotate-2',
  'rotate-2',
];

export default function PhotoGallery({
  images,
  rotations = DEFAULT_ROTATIONS,
  containerClasses = '-my-4 -mx-4 flex justify-start gap-3 overflow-x-auto overflow-y-visible scrollbar-hide lg:overflow-visible lg:justify-center lg:mx-0 py-4 pl-4 pr-8 lg:px-0 sm:gap-5 lg:gap-6',
  imageClasses = 'relative aspect-[9/10] w-32 flex-none overflow-hidden rounded-lg xs:w-40 sm:w-48 md:w-52 lg:w-56 sm:rounded-xl lg:rounded-2xl',
  gap = 'gap-3 sm:gap-5 lg:gap-8',
}: PhotoGalleryConfig) {
  return (
    <section className="flex w-full justify-center overflow-visible">
      <div className={containerClasses}>
        {images.map((image, index) => {
          const rotation = rotations[index % rotations.length];
          return (
            <div
              key={`${image.src}-${index}`}
              className={`${imageClasses} ${rotation} transition-transform duration-200 ease-out`}
            >
              <Image
                alt={image.alt}
                src={image.src}
                fill
                className={`absolute inset-0 h-full w-full rounded-xl object-cover sm:rounded-2xl ${image.objectPosition}`}
                sizes="(min-width: 640px) 18rem, 11rem"
                priority={image.priority}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
