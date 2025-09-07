'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef } from 'react';
import { XIcon } from 'lucide-react';
import { ImageGroupProps } from './types';
import { CollapsedCard } from './collapsed-card';
import { ExpandedView } from './expanded-view';
import { ImagePlaceholder } from './image-placeholder';
import { useImageGroup } from './use-image-group';
import { Modal } from '../../atoms/modal';

export default function ImageGroup({ config, isOpen, onOpenChange }: ImageGroupProps) {
  const {
    expanded,
    setExpanded,
    isHovered,
    setIsHovered,
    isPressed,
    setIsPressed,
    breakpoint,
    deviceConfig,
    displayCards,
    maxImages,
    isHydrated,
  } = useImageGroup(config, isOpen, onOpenChange);

  const modalRef = useRef<HTMLDivElement>(null);

  if (!config.images || config.images.length === 0) {
    return null;
  }

  if (!isHydrated) {
    return <ImagePlaceholder />;
  }

  return (
    <>
      <div
        className={`relative grid place-items-center ${deviceConfig.containerHeight} m-auto w-full max-w-[345px] cursor-pointer`}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          setExpanded(true);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <AnimatePresence initial={false}>
          {!expanded &&
            displayCards
              .slice(0, maxImages)
              .map((card, idx) => (
                <CollapsedCard
                  key={card._identity}
                  card={card}
                  index={idx}
                  totalCards={Math.min(displayCards.length, maxImages)}
                  onExpand={() => setExpanded(true)}
                  isHovered={isHovered}
                  isPressed={isPressed}
                  deviceConfig={deviceConfig}
                />
              ))}
        </AnimatePresence>
      </div>

      <Modal
        open={expanded}
        onOpenChange={setExpanded}
        overlayClassName="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        contentClassName="fixed inset-0 z-50 flex items-center justify-center max-w-full"
        animationConfig={{
          content: {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
            transition: {
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.4,
            },
          },
        }}
      >
        <motion.div
          ref={modalRef}
          key="expanded-content"
          className={`relative isolate overflow-visible ${deviceConfig.expandedModal.width} ${deviceConfig.expandedModal.height} ${deviceConfig.expandedModal.padding}`}
          style={{
            borderRadius: deviceConfig.borderRadius,
            transformStyle: 'preserve-3d',
            isolation: 'isolate',
          }}
        >
          <ExpandedView cards={displayCards} deviceConfig={deviceConfig} breakpoint={breakpoint} />

          <button
            onClick={() => setExpanded(false)}
            className="bg-base-100 group absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border-[1px] border-black border-opacity-30 p-2 shadow-lg transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 group-hover:scale-105"
            aria-label="Close modal"
          >
            <XIcon className="text-dawn-900 size-4 transition-colors duration-150 group-hover:text-black/75" />
          </button>
        </motion.div>
      </Modal>
    </>
  );
}
