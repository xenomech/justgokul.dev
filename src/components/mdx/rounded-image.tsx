import Image from 'next/image';

export const RoundedImage = (props: any) => {
  return (
    <div className={props.tails}>
      <Image alt={props.alt} className="rounded-xl" {...props} />
    </div>
  );
};
