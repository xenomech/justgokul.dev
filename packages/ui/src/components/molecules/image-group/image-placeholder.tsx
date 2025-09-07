'use client';

import React from 'react';
import { BREAKPOINT_CONFIGS } from './config';

export function ImagePlaceholder() {
  const containerClasses = Object.entries(BREAKPOINT_CONFIGS)
    .map(([breakpoint, config]) => {
      const prefix = breakpoint === 'sm' ? '' : `${breakpoint}:`;
      return `${prefix}${config.containerHeight}`;
    })
    .join(' ');

  const placeholderClasses = Object.entries(BREAKPOINT_CONFIGS)
    .map(([breakpoint, config]) => {
      const { width: configWidth, height: configHeight } = config.cardDimensions;
      const aspectRatio = configWidth / configHeight;
      const maxWidth = Math.min(configWidth, 345);
      const responsiveHeight = Math.round(maxWidth / aspectRatio);

      const prefix = breakpoint === 'sm' ? '' : `${breakpoint}:`;
      return `${prefix}w-[${maxWidth}px] ${prefix}h-[${responsiveHeight}px]`;
    })
    .join(' ');

  return (
    <div
      className={`relative grid place-items-center ${containerClasses} m-auto w-full max-w-[345px]`}
    >
      <div className={`animate-pulse rounded-2xl bg-gray-200 ${placeholderClasses}`} />
    </div>
  );
}
