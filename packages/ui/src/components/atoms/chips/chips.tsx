import classNames from 'classnames';
import { ExternalLink } from 'lucide-react';

export type ChipsProps = {
  text: string;
  showExternalIcon?: boolean;
  className?: string;
};

export const Chips = ({ text, showExternalIcon = false, className }: ChipsProps) => {
  return (
    <div
      className={classNames(
        'bg-base-100 flex items-center justify-center gap-4 rounded-lg border-[1px] border-black border-opacity-10 px-3 py-2 text-sm transition-all duration-200 ease-out hover:scale-105',
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <p className="font-medium capitalize">{text}</p>
      </div>
      {showExternalIcon && <ExternalLink className="h-4 w-4 text-black text-opacity-60" />}
    </div>
  );
};
