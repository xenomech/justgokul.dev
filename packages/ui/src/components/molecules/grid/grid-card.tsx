import ImageGroup from '../image-group/image-group';
import { ReactNode, ComponentType } from 'react';
import { generatePastelColor } from '../../../utils/utils';
import { convertDateToString } from '@repo/utils';

type PropType = {
  title: string;
  slug: string;
  views?: number;
  readingTime?: string;
  date?: string;
  excerpt?: string;
  lookupImages: string[];
  CountComponent?: ReactNode;
  onClick?: () => void;
  customCard?: {
    component: ComponentType<any>;
    props?: any;
  };
};

export default function GridCard({
  title,
  slug,
  readingTime,
  date,
  excerpt,
  lookupImages,
  onClick,
  customCard,
}: PropType) {
  const colorPalette = ['#FFEDD5', '#D5E9FF', '#F3E7FF', '#DCFCE6', '#FEF9C3', '#FAFAFA'];

  const pastelColors = generatePastelColor(slug, colorPalette);

  return (
    <div
      className="group w-full max-w-[370px] rounded-xl pb-6 pt-2 opacity-80 shadow-sm transition-all duration-200 ease-out hover:scale-[0.98]"
      style={{
        backgroundColor: pastelColors.background,
        borderColor: pastelColors.border,
        borderWidth: '1px',
        borderStyle: 'solid',
      }}
    >
      <div className="cursor-pointer p-4" onClick={onClick}>
        <h3
          className="mb-1 line-clamp-2 text-xl font-semibold transition-colors duration-200"
          style={{ color: pastelColors.text }}
        >
          {title}
        </h3>

        {excerpt && (
          <p
            className="mb-2 line-clamp-3 text-sm leading-relaxed"
            style={{ color: pastelColors.text, opacity: 0.8 }}
          >
            {excerpt}
          </p>
        )}

        <div
          className="mb-2 flex flex-wrap items-center gap-1 text-xs"
          style={{ color: pastelColors.text, opacity: 0.6 }}
        >
          {date && (
            <div className="flex min-w-0 items-center gap-1">
              <span className="truncate">
                <span className="hidden sm:inline">Posted </span>
                {convertDateToString(date)}
              </span>
            </div>
          )}

          {readingTime && (
            <div className="flex min-w-0 items-center gap-1">
              <span className="hidden sm:inline">{' • '}</span>
              <span className="truncate">{readingTime}</span>
            </div>
          )}
        </div>
      </div>

      <ImageGroup
        config={{
          _identity: slug,
          images: lookupImages.map((item, index) => ({
            src: item,
            alt: title,
            width: 460,
            height: 280,
            _identity: `${slug}-image-${index}`,
          })),
          title,
          excerpt,
          customCard,
        }}
      />
    </div>
  );
}
