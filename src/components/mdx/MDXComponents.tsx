import { Callout } from '@/components/callout';
import { cn } from '@/lib/common/utils';
import { Gallery } from './gallery';
import { RoundedImage } from './rounded-image';
interface GenericComponentType {
  className: string;
  children: React.ReactNode;
}

function Flex({ className, children }: GenericComponentType) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center md:flex-row',
        className
      )}
    >
      {children}
    </div>
  );
}

function Grid({ className, children }: GenericComponentType) {
  return (
    <div
      className={cn(
        'grid w-full items-center justify-center gap-4 p-4 2xl:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}
export const MDXComponents = {
  Image: RoundedImage,
  Flex,
  Grid,
  Gallery,
  Callout,
};
