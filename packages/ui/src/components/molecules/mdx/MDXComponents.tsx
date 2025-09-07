import classNames from 'classnames';
import Gallery from './gallery';
import ImageGrid from './image-grid';
import RoundedImage from './rounded-image';

interface GenericComponentProps {
  className: string;
  children: React.ReactNode;
}

function Flex({ className, children }: GenericComponentProps) {
  return (
    <div className={classNames('flex flex-col items-center justify-center md:flex-row', className)}>
      {children}
    </div>
  );
}

function Grid({ className, children }: GenericComponentProps) {
  return (
    <div
      className={classNames(
        'grid w-full items-center justify-center gap-4 p-4 2xl:grid-cols-2',
        className
      )}
    >
      {children}
    </div>
  );
}

const MDXComponents = {
  Image: RoundedImage,
  Flex,
  Grid,
  Gallery,
  ImageGrid,
};

export default MDXComponents;
