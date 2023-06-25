'use client';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

type PropType = {
  type?: string;
  className?: string;
  children: React.ReactNode;
  action?: string;
};
export default function Button({
  type,
  className,
  children,
  action,
}: PropType) {
  const router = useRouter();
  var style: string = '';
  switch (type) {
    case 'Primary':
      style = classNames(
        'rounded-lg bg-[#171716] px-4 py-[10px] text-white',
        className
      );
      break;
    case 'Navigator':
      style = classNames(
        'rounded-lg border-[1px] border-black border-opacity-40 px-3 py-1 transition-all duration-100 ease-in-out hover:scale-105 bg-base-100',
        className
      );
      break;
  }
  function buttonAction() {
    switch (action) {
      case 'Back':
        router.back();
        break;
    }
  }
  return (
    <button className={style} onClick={buttonAction}>
      {children}
    </button>
  );
}
