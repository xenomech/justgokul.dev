import classNames from 'classnames';

type PropType = {
  isLink?: boolean;
  type?: string;
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
};
export default function Button({
  //   onClick,
  //   isLink,
  type,
  className,
  children,
}: PropType) {
  var style: string = '';
  switch (type) {
    case 'Primary':
      style = classNames(
        'rounded-lg bg-[#171716] px-4 py-[10px] text-white',
        className
      );
      break;
  }
  return <button className={style}>{children}</button>;
}
