import { cn } from '@/lib/common/utils';
import * as React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className: string;
  text: string;
}
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, text }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'rounded-md border-[1px] border-black border-opacity-40 px-2.5 py-0.5 text-xs font-semibold',
          className
        )}
      >
        {text}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
