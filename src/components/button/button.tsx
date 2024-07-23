'use client';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';

type PropType = {
  type?: 'Primary' | 'Navigator';
  className?: string;
  children: React.ReactNode;
  action?: 'Navigate' | 'Link';
  url: string;
  isDisabled?: boolean;
};
export default function Button({
  type,
  className,
  children,
  action,
  isDisabled,
  url,
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
      case 'Navigate':
        router.push(url);
        break;
      case 'Link':
        window.open(url);
        break;
    }
  }
  return (
    <button className={style} onClick={buttonAction} disabled={isDisabled}>
      {children}
    </button>
  );
}
