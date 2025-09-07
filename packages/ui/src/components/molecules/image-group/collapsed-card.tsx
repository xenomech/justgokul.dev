'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { CollapsedCardProps } from './types';
import { ROTATION_CONFIG } from './config';

export function CollapsedCard({
  card,
  index,
  totalCards,
  onExpand,
  isHovered,
  isPressed,
  deviceConfig,
}: CollapsedCardProps) {
  const step = totalCards > 1 ? (ROTATION_CONFIG.max - ROTATION_CONFIG.min) / (totalCards - 1) : 0;
  const baseRotation = ROTATION_CONFIG.min + index * step;
  const hoverRotation = isHovered ? baseRotation * 0.6 : baseRotation;

  const { width: configWidth, height: configHeight } = deviceConfig.cardDimensions;
  const borderRadius = deviceConfig.borderRadius;

  const aspectRatio = configWidth / configHeight;
  const maxWidth = Math.min(configWidth, 345);
  const responsiveWidth = maxWidth;
  const responsiveHeight = maxWidth / aspectRatio;

  return (
    <motion.div
      layoutId={`card-${card._identity}`}
      className="group relative cursor-pointer select-none overflow-hidden shadow-sm outline-none"
      animate={{
        rotate: hoverRotation,
        scale: isPressed ? 0.98 : 1,
      }}
      onClick={onExpand}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        width: responsiveWidth,
        height: responsiveHeight,
        borderRadius,
        gridColumn: 1,
        gridRow: 1,
        justifySelf: 'center',
        alignSelf: 'center',
        zIndex: index,
        pointerEvents: 'auto',
      }}
      role="button"
      tabIndex={0}
      aria-label={`Expand ${card.alt}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      {card.isCustomCard && card.customComponent ? (
        <div
          className="ease flex h-full w-full items-center justify-center transition-all duration-200 group-hover:shadow-md"
          style={{ borderRadius }}
        >
          <card.customComponent {...(card.customProps || {})} />
        </div>
      ) : (
        <Image
          src={card.image}
          alt={card.alt}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover shadow-lg"
          style={{ borderRadius }}
          width={responsiveWidth}
          height={responsiveHeight}
          priority={index === 0}
        />
      )}
    </motion.div>
  );
}
