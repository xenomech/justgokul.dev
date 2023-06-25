import Image from 'next/image';

export default function RoundedImage(props) {
  return (
    <div className={props.tails}>
      <Image alt={props.alt} className="rounded-xl" {...props} />
    </div>
  );
}
