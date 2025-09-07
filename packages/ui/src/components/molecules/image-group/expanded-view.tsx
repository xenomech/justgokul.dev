'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { ExpandedViewProps } from './types';
import { getOffset } from './config';

export function ExpandedView({
  cards,
  deviceConfig,
  breakpoint,
}: ExpandedViewProps): React.ReactElement {
  const { width, height } = deviceConfig.cardDimensions;
  const borderRadius = deviceConfig.borderRadius;

  return (
    <div className="relative isolate h-full w-full overflow-visible">
      <div className="relative grid h-full w-full grid-cols-2 items-center justify-center justify-items-center gap-2">
        {cards.map((card, idx) => {
          const { rotation } = getOffset(idx);

          const commonProps = {
            layoutId: `card-${card._identity}`,
            animate: { rotate: rotation },
            className: `flex flex-col relative cursor-pointer ${
              breakpoint === 'sm'
                ? 'w-[280px] h-[170px] rounded-[16px]'
                : breakpoint === 'md'
                  ? 'w-[320px] h-[190px] rounded-[17px]'
                  : breakpoint === 'lg'
                    ? 'w-[380px] h-[230px] rounded-[18px]'
                    : breakpoint === 'xl'
                      ? 'w-[420px] h-[250px] rounded-[19px]'
                      : 'w-[460px] h-[280px] rounded-[20px]'
            } ${idx >= 2 ? '-mt-[60px]' : ''}`,
            style: {
              justifySelf: idx % 2 === 0 ? 'start' : 'end',
              alignSelf: idx < 2 ? 'end' : 'start',
              zIndex: 10 + idx,
            } as React.CSSProperties,
            whileHover: { scale: 1 },
            whileTap: { scale: 0.98 },
            role: 'button' as const,
            tabIndex: 0,
          };

          if (card.isCustomCard && card.customComponent) {
            return (
              <motion.div
                key={card._identity}
                layoutId={commonProps.layoutId}
                animate={commonProps.animate}
                className={commonProps.className}
                style={commonProps.style}
                whileHover={commonProps.whileHover}
                whileTap={commonProps.whileTap}
                role={commonProps.role}
                tabIndex={commonProps.tabIndex}
              >
                <div
                  className="ease flex h-full w-full items-center justify-center transition-all duration-200"
                  style={{ borderRadius }}
                >
                  <card.customComponent {...(card.customProps || {})} />
                </div>
              </motion.div>
            );
          }

          return (
            <motion.div key={card._identity} {...commonProps}>
              <Image
                src={card.image}
                alt={card.alt}
                className="pointer-events-none h-full w-full object-cover"
                style={{ borderRadius }}
                width={width}
                height={height}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
