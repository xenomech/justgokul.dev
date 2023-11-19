import { cn } from '@/lib/common/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'transition-all duration-100 ease-in-out hover:scale-105',
  {
    variants: {
      variant: {
        primary: 'rounded-lg bg-[#171716] text-white',
        navigator: 'border-[1px] border-black border-opacity-40 bg-base-100',
      },
      size: {
        primary: 'rounded-lg px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
