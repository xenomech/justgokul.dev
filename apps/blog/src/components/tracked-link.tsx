'use client';
import analytics from '@/lib/analytics';
import Link from 'next/link';
import { ComponentProps, ReactNode } from 'react';

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  eventName: string;
  eventProperties?: Record<string, any>;
  children: ReactNode;
  className?: string;
}

export function TrackedLink({
  eventName,
  eventProperties,
  children,
  className,
  ...linkProps
}: TrackedLinkProps) {
  const handleClick = () => {
    analytics.track(eventName, {
      url: linkProps.href.toString(),
      ...eventProperties,
    });
  };

  return (
    <Link {...linkProps} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
