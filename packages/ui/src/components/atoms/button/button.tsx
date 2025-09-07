import { cn } from '../../../utils/utils';
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: 'bg-[#171716] text-white hover:bg-[#171716]/90 hover:scale-105',
        navigator: 'border border-black/40 bg-white hover:bg-gray-50 hover:scale-105',
        link: 'bg-[#171716] text-white hover:bg-[#171716]/90 hover:scale-105',
        back: 'border border-black/40 bg-white hover:bg-gray-50 hover:scale-105',
      },
      size: {
        sm: 'h-8 px-3 py-1 text-sm',
        md: 'h-9 px-4 py-2',
        lg: 'h-10 px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps extends React.ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  variant,
  size,
  className,
  children,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {leftIcon && (
        <span className="icon-left transition-transform duration-200 ease-out group-hover:-translate-x-0.5">
          {leftIcon}
        </span>
      )}
      {children && <span className="button-content">{children}</span>}
      {rightIcon && (
        <span className="icon-right transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          {rightIcon}
        </span>
      )}
    </button>
  );
}
