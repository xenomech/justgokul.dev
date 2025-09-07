'use client';

import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Button from '../../../atoms/button/button';
import { convertDateToString, formatDate } from '@repo/utils';

export interface SimpleCardConfig {
  title: string;
  excerpt: string;
  readingTime: string;
  date: string;
  slug: string;
}

export interface SimpleCardProps extends SimpleCardConfig {
  className?: string;
  onClick?: () => void;
}

export default function SimpleCard({
  title,
  excerpt,
  readingTime,
  date,
  className = '',
  onClick,
}: SimpleCardProps) {
  return (
    <article
      className={`group relative flex h-full w-full flex-col items-center justify-center space-y-2 rounded-xl border border-gray-200 bg-gradient-to-br from-white to-green-50 p-6 text-center shadow-sm transition-all duration-300 ease-out hover:shadow-lg ${className}`}
      role="article"
      aria-label={`Article: ${title}`}
    >
      <header>
        <h3 className="font-bold leading-tight text-gray-900 transition-colors duration-300">
          {title}
        </h3>
      </header>

      <div>
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 transition-colors duration-300">
          {excerpt}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 md:gap-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300" />
          <span className="hidden font-medium md:block">{convertDateToString(date)}</span>
          <span className="block font-medium md:hidden">{convertDateToString(date, '/')}</span>
        </div>

        {readingTime && (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gray-400 transition-colors duration-300" />
            <span className="font-medium">{readingTime}</span>
          </div>
        )}
      </div>

      <Button
        onClick={onClick}
        variant="primary"
        rightIcon={<ArrowRight className="h-4 w-4" />}
        aria-label={`Read more about ${title}`}
        className="!mt-6"
      >
        Read More
      </Button>
    </article>
  );
}
