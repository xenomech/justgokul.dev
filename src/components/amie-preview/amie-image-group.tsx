"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

// Constants for better maintainability
const CARD_DIMENSIONS = {
  width: 460,
  height: 280,
} as const;

const ROTATION_CONFIG = {
  min: -4,
  max: 4,
} as const;

const EXPANDED_ROTATIONS = [-5, 5, -3, 0] as const;
const EXPANDED_OVERLAPS = [0, -50, -50, -50] as const;

interface ImageCard {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CardData {
  title: string;
  alt: string;
  subtitle: string;
  description: string;
  longDescription: string;
  image: string;
  logo: string;
}

interface CardProps {
  card: CardData;
  idx: number;
  onExpand: () => void;
  totalCards: number;
}

interface ExpandedCardGridProps {
  cards: CardData[];
  onCollapse: () => void;
}

interface ImageGroupProps {
  images: ImageCard[];
  title?: string;
  excerpt?: string;
  slug?: string;
  type?: 'blog' | 'snippets' | 'twitter' | 'stories';
}

// Card in stacked (collapsed) state
function Card({ card, idx, onExpand, totalCards }: CardProps) {
  // Calculate rotation for each card, e.g. -8, -4, 0, 4, 8 degrees for 5 cards
  const step = totalCards > 1 ? (ROTATION_CONFIG.max - ROTATION_CONFIG.min) / (totalCards - 1) : 0;
  const rotation = ROTATION_CONFIG.min + idx * step;

  return (
    <motion.div
      layoutId={`card-${card.alt || card.title}`}
      className="h-[280px] w-[460px] rounded-[20px] overflow-hidden m-auto relative outline-none select-none cursor-pointer"
      whileTap={{ scale: 0.98 }}
      onClick={onExpand}
      animate={{ rotate: rotation }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        margin: "auto",
        zIndex: idx,
        width: `${CARD_DIMENSIONS.width}px`,
        height: `${CARD_DIMENSIONS.height}px`,
        pointerEvents: "auto",
      }}
      role="button"
      tabIndex={0}
      aria-label={`Expand ${card.alt || card.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand();
        }
      }}
    >
      <motion.img
        layoutId={`image-${card.alt || card.title}`}
        src={card.image}
        alt={card.alt || ""}
        className="h-full w-full absolute inset-0 object-cover pointer-events-none rounded-[20px]"
      />
    </motion.div>
  );
}

// Card in expanded (unstacked) state as grid with overlap and tilt
function ExpandedCardGrid({ cards, onCollapse }: ExpandedCardGridProps) {
  // For click outside
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onCollapse);

  return (
    <motion.div
      className="fixed bg-black/10 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCollapse}
      role="dialog"
      aria-modal="true"
      aria-label="Expanded image gallery"
    >
      <motion.div
        ref={ref}
        className="relative rounded-[20px] p-8 w-[50vw] h-[75vh] overflow-visible"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 justify-center justify-items-center items-center w-full h-full relative">
          {cards.map((card, idx) => {
            const rotation = EXPANDED_ROTATIONS[idx] || 0;
            const marginLeft = EXPANDED_OVERLAPS[idx] || 0;
            const marginTop = idx >= 2 ? -250 : 0;
            return (
              <motion.div
                key={card.alt || card.title}
                layoutId={`card-${card.alt || card.title}`}
                className="w-[460px] h-[280px] flex rounded-[20px] flex-col card card-active shadow-xl relative cursor-pointer"
                animate={{ rotate: rotation }}
                style={{
                  marginLeft: idx === 0 ? 0 : marginLeft,
                  marginTop: marginTop,
                  zIndex: 10 + idx,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onCollapse();
                }}
                role="button"
                tabIndex={0}
                aria-label={`Close ${card.alt || card.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onCollapse();
                  }
                }}
              >
                <motion.img
                  layoutId={`image-${card.alt || card.title}`}
                  src={card.image}
                  alt={card.alt || ""}
                  className="h-full w-full object-cover pointer-events-none rounded-[20px]"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ImageGroup({ images }: ImageGroupProps) {
  const [expanded, setExpanded] = useState(false);

  // Prevent body scrolling when expanded
  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expanded]);

  // Collapse on Escape
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Convert images to card format and use first 4
  const displayCards: CardData[] = images.slice(0, 4).map((image, idx) => ({
    title: `image-${idx}`,
    alt: image.alt,
    subtitle: image.alt,
    description: image.alt,
    longDescription: image.alt,
    image: image.src,
    logo: image.src,
  }));

  return (
    <div className="flex justify-center items-center flex-col relative h-80 w-full m-auto">
      <AnimatePresence initial={false}>
        {!expanded &&
          displayCards.map((card, idx) => (
            <Card
              key={card.alt || card.title}
              card={card}
              idx={idx}
              totalCards={displayCards.length}
              onExpand={() => setExpanded(true)}
            />
          ))}
        {expanded && (
          <ExpandedCardGrid
            cards={displayCards}
            onCollapse={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


