import Image from 'next/image';

interface RoundedImageProps {
  src: string;
  alt: string;
  className?: string;
  [key: string]: any; // For other Image props
}

export default function RoundedImage(props: RoundedImageProps) {
  const { className, alt, ...imageProps } = props;
  
  return (
    <div className={className}>
      <Image alt={alt} className="rounded-xl" {...imageProps} />
    </div>
  );
}
