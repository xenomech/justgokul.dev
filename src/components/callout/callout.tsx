import cn from 'clsx';
import type { ReactNode } from 'react';

const EmojiTypes = {
  default: '💡',
  error: '🚫',
  info: 'ℹ️',
  warning: '⚠️',
};

type CalloutType = keyof typeof EmojiTypes;

const classes: Record<CalloutType, string> = {
  default: cn('border-orange-200 bg-orange-100 text-orange-800'),
  error: cn('border-red-200 bg-red-100 text-red-900'),
  info: cn('border-blue-200 bg-blue-100 text-blue-900'),
  warning: cn('border-amber-200 bg-amber-100 text-amber-900'),
};

type CalloutProps = {
  type?: CalloutType;
  emoji?: string;
  children: ReactNode;
};

export default function Callout({
  children,
  type = 'default',
  emoji = EmojiTypes[type],
}: CalloutProps) {
  return (
    <div
      className={cn(
        'py-4 px-4 overflow-x-auto gap-2 flex flex-col items-start',
        'md:flex-row md:items-center md:gap-4 md:py-0 rounded-lg border',
        classes[type]
      )}
    >
      <span className="select-none">{emoji}</span>
      <div className="w-full">{children}</div>
    </div>
  );
}
