"use client";

import Button from "@/components/button/button";
import { useIsMobile, useIsTablet } from "@/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
  
// Constants for better maintainability
const ROTATION_CONFIG = {
  min: -4,
  max: 4,
} as const;

// // Image sizes for srcset
// const IMAGE_SIZES = {
//   small: 230,    // 0.5x
//   medium: 460,   // 1x (original)
//   large: 920,    // 2x
//   xlarge: 1380,  // 3x
// } as const;

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
  isCustomCard?: boolean;
}

interface CardProps {
  card: CardData;
  idx: number;
  onExpand: () => void;
  totalCards: number;
  isHovered: boolean;
}

interface ExpandedCardGridProps {
  cards: CardData[];
  onCollapse: () => void;
}

interface ImageGroupProps {
  images: ImageCard[];
  title?: string;
  excerpt?: string;
  type?: 'blog' | 'snippets' | 'twitter' | 'photography';
}

// Normalized expanded layout (desktop-consistent)
const EXPANDED_OFFSETS = [
  { dx: -1, dy: -1 }, // idx 0
  { dx: 1, dy: -1 },  // idx 1
  { dx: -1, dy: 1 },  // idx 2
  { dx: 1, dy: 1 },   // idx 3 (custom)
] as const;

const EXPANDED_ROTATIONS = [0, 5, -5, 2] as const;

function getOffset(idx: number) {
  const { dx, dy } = EXPANDED_OFFSETS[idx] || { dx: 0, dy: 0 };
  const rotation = EXPANDED_ROTATIONS[idx] ?? 0;
  return { dx, dy, rotation };
}

// ===== CUSTOM CARD COMPONENT =====
interface CustomCardProps extends Pick<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onKeyDown' | 'style' | 'className'> {
  card: CardData;
  layoutId: string;
  textSizes: {
    title: string;
    description: string;
    button: string;
  };
  padding: string;
  showIcon?: boolean;
}

function CustomCard({ 
  card, 
  layoutId, 
  className, 
  style,
  textSizes, 
  padding,
  showIcon = false,
  onClick,
  onKeyDown
}: CustomCardProps) {
  return (
    <motion.div
      key={card.alt || card.title}
      layoutId={layoutId}
      className={`${className} border border-gray-200`}
      style={style}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className={`h-full w-full flex flex-col justify-center items-center text-gray-800 ${padding} text-center`}>
        <h3 className={`${textSizes.title} font-bold mb-2 leading-tight`}>{card.title}</h3>
        <p className={`${textSizes.description} mb-3 text-gray-600 line-clamp-3`}>{card.description}</p>
        <Button type="Primary" className={`${textSizes.button} ${showIcon ? 'flex items-center' : ''}`}>
          {showIcon ? (
            <>
              View Post
              <span className="ml-2"><MoveRight/></span>
            </>
          ) : (
            'Read More'
          )}
        </Button>
      </div>
    </motion.div>
  );
}

// ===== MOBILE COMPONENTS =====
const MOBILE_CONFIG = {
  cardDimensions: { width: 280, height: 170 },
  containerHeight: 'h-44', // 176px
  expandedModal: { width: 'w-[95vw]', height: 'h-[90vh]', padding: 'p-3' },
  overlaps: [0, -35, -35, -35], // Increased overlaps to prevent screen bleeding
  marginTop: -100, // Reduced to keep cards within viewport
  textSizes: {
    title: 'text-lg',
    description: 'text-sm',
    button: 'px-3 py-2 text-sm'
  }
} as const;

// Mobile Card in stacked (collapsed) state
function MobileCard({ card, idx, onExpand, totalCards, isHovered }: CardProps) {
  const step = totalCards > 1 ? (ROTATION_CONFIG.max - ROTATION_CONFIG.min) / (totalCards - 1) : 0;
  const baseRotation = ROTATION_CONFIG.min + idx * step;
  const hoverRotation = isHovered ? baseRotation * 0.60 : baseRotation;

  return (
    <motion.div
      layoutId={`card-${card.alt || card.title}`}
      className="h-[170px] w-[280px] rounded-[16px] overflow-hidden relative outline-none select-none cursor-pointer bg-white"
      whileTap={{ scale: 0.98 }}
      onClick={onExpand}
      animate={{ rotate: hoverRotation }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        gridColumn: 1,
        gridRow: 1,
        justifySelf: 'center',
        alignSelf: 'center',
        zIndex: idx,
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
      <Image
        src={card.image}
        alt={card.alt || ""}
        className="h-full w-full absolute inset-0 object-cover pointer-events-none rounded-[16px]"
        width={280}
        height={170}
        priority={idx === 0}
      />
    </motion.div>
  );
}

// Mobile Expanded Card Grid - 4th card centered, images arranged around it
function MobileExpandedCardGrid({ cards, onCollapse }: ExpandedCardGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onCollapse);

  return (
    <motion.div
      className="fixed bg-black/20 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-2"
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
        className={`relative rounded-[16px] ${MOBILE_CONFIG.expandedModal.padding} ${MOBILE_CONFIG.expandedModal.width} ${MOBILE_CONFIG.expandedModal.height} overflow-visible`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-1 justify-center justify-items-center items-center w-full h-full relative">
          {cards.map((card, idx) => {
            const { rotation } = getOffset(idx);
            const isCenter = card.isCustomCard;
            
            const commonProps = {
              layoutId: `card-${card.alt || card.title}`,
              animate: { rotate: rotation },
              className: `w-[280px] h-[170px] flex rounded-[16px] flex-col card card-active shadow-xl relative cursor-pointer bg-white ${idx >= 2 ? '-mt-[60px]' : ''}`,
              style: {
                justifySelf: idx % 2 === 0 ? 'start' : 'end',
                alignSelf: idx < 2 ? 'end' : 'start',
                zIndex: 10 + idx,
              } as React.CSSProperties,
              onClick: (e: React.MouseEvent) => { e.stopPropagation(); onCollapse(); },
              role: 'button' as const,
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCollapse(); } },
            };
            
            if (isCenter) {
              return (
                <CustomCard
                  key={card.alt || card.title}
                  card={card}
                  layoutId={commonProps.layoutId}
                  className={commonProps.className}
                  style={commonProps.style}
                  textSizes={MOBILE_CONFIG.textSizes}
                  padding="p-4"
                  onClick={commonProps.onClick}
                  onKeyDown={commonProps.onKeyDown}
                />
              );
            }
            
            return (
              <motion.div
                key={card.alt || card.title}
                {...commonProps}
              >
                <Image
                  src={card.image}
                  alt={card.alt || ""}
                  className="h-full w-full object-cover pointer-events-none rounded-[16px]"
                  width={280}
                  height={170}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== TABLET COMPONENTS =====
const TABLET_CONFIG = {
  cardDimensions: { width: 380, height: 230 },
  containerHeight: 'h-64', // 256px
  expandedModal: { width: 'w-[80vw]', height: 'h-[80vh]', padding: 'p-6' },
  overlaps: [0, -50, -50, -50], // Increased overlaps to prevent screen bleeding
  marginTop: -180, // Reduced to keep cards within viewport
  textSizes: {
    title: 'text-xl',
    description: 'text-base',
    button: 'px-5 py-2.5 text-base'
  }
} as const;

// Tablet Card in stacked (collapsed) state
function TabletCard({ card, idx, onExpand, totalCards, isHovered }: CardProps) {
  const step = totalCards > 1 ? (ROTATION_CONFIG.max - ROTATION_CONFIG.min) / (totalCards - 1) : 0;
  const baseRotation = ROTATION_CONFIG.min + idx * step;
  const hoverRotation = isHovered ? baseRotation * 0.60 : baseRotation;

  return (
    <motion.div
      layoutId={`card-${card.alt || card.title}`}
      className="h-[230px] w-[380px] rounded-[18px] overflow-hidden relative outline-none select-none cursor-pointer bg-white"
      whileTap={{ scale: 0.98 }}
      onClick={onExpand}
      animate={{ rotate: hoverRotation }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        gridColumn: 1,
        gridRow: 1,
        justifySelf: 'center',
        alignSelf: 'center',
        zIndex: idx,
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
      <Image
        src={card.image}
        alt={card.alt || ""}
        className="h-full w-full absolute inset-0 object-cover pointer-events-none rounded-[18px]"
        width={380}
        height={230}
        priority={idx === 0}
      />
    </motion.div>
  );
}

// Tablet Expanded Card Grid - 4th card centered, images arranged around it
function TabletExpandedCardGrid({ cards, onCollapse }: ExpandedCardGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onCollapse);

  return (
    <motion.div
      className="fixed bg-black/15 backdrop-blur-sm inset-0 z-50 flex items-center justify-center p-4"
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
        className={`relative rounded-[18px] ${TABLET_CONFIG.expandedModal.padding} ${TABLET_CONFIG.expandedModal.width} ${TABLET_CONFIG.expandedModal.height} overflow-visible`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-2 justify-center justify-items-center items-center w-full h-full relative">
          {cards.map((card, idx) => {
            const { rotation } = getOffset(idx);
            const isCenter = card.isCustomCard;
            
            const commonProps = {
              layoutId: `card-${card.alt || card.title}`,
              animate: { rotate: rotation },
              className: `w-[380px] h-[230px] flex rounded-[18px] flex-col card card-active shadow-xl relative cursor-pointer bg-white ${idx >= 2 ? '-mt-[70px]' : ''}`,
              style: {
                justifySelf: idx % 2 === 0 ? 'start' : 'end',
                alignSelf: idx < 2 ? 'end' : 'start',
                zIndex: 10 + idx,
              } as React.CSSProperties,
              onClick: (e: React.MouseEvent) => { e.stopPropagation(); onCollapse(); },
              role: 'button' as const,
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCollapse(); } },
            };
            
            if (isCenter) {
              return (
                <CustomCard
                  key={card.alt || card.title}
                  card={card}
                  layoutId={commonProps.layoutId}
                  className={commonProps.className}
                  style={commonProps.style}
                  textSizes={TABLET_CONFIG.textSizes}
                  padding="p-6"
                  onClick={commonProps.onClick}
                  onKeyDown={commonProps.onKeyDown}
                />
              );
            }
            
            return (
              <motion.div
                key={card.alt || card.title}
                {...commonProps}
              >
                <Image
                  src={card.image}
                  alt={card.alt || ""}
                  className="h-full w-full object-cover pointer-events-none rounded-[18px]"
                  width={380}
                  height={230}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== DESKTOP COMPONENTS =====
const DESKTOP_CONFIG = {
  cardDimensions: { width: 460, height: 280 },
  containerHeight: 'h-80', // 320px
  expandedModal: { width: 'w-[50vw]', height: 'h-[75vh]', padding: 'p-8' },
  overlaps: [0, -50, -50, -50],
  marginTop: -250,
  textSizes: {
    title: 'text-2xl',
    description: 'text-lg',
    button: 'px-6 py-3 text-base'
  }
} as const;

// Desktop Card in stacked (collapsed) state
function DesktopCard({ card, idx, onExpand, totalCards, isHovered }: CardProps) {
  const step = totalCards > 1 ? (ROTATION_CONFIG.max - ROTATION_CONFIG.min) / (totalCards - 1) : 0;
  const baseRotation = ROTATION_CONFIG.min + idx * step;
  const hoverRotation = isHovered ? baseRotation  * 0.60 : baseRotation;

  return (
    <motion.div
      layoutId={`card-${card.alt || card.title}`}
      className="h-[280px] w-[460px] rounded-[20px] overflow-hidden relative outline-none select-none cursor-pointer bg-white"
      whileTap={{ scale: 0.98 }}
      onClick={onExpand}
      animate={{ rotate: hoverRotation }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{
        gridColumn: 1,
        gridRow: 1,
        justifySelf: 'center',
        alignSelf: 'center',
        zIndex: idx,
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
      <Image
        src={card.image}
        alt={card.alt || ""}
        className="h-full w-full absolute inset-0 object-cover pointer-events-none rounded-[20px]"
        width={460}
        height={280}
        priority={idx === 0}
      />
    </motion.div>
  );
}

// Desktop Expanded Card Grid
function DesktopExpandedCardGrid({ cards, onCollapse }: ExpandedCardGridProps) {
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
        className={`relative rounded-[20px] ${DESKTOP_CONFIG.expandedModal.padding} ${DESKTOP_CONFIG.expandedModal.width} ${DESKTOP_CONFIG.expandedModal.height} overflow-visible`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="grid grid-cols-2 gap-4 justify-center justify-items-center items-center w-full h-full relative">
          {cards.map((card, idx) => {
            const { rotation } = getOffset(idx);
            
            const commonProps = {
              layoutId: `card-${card.alt || card.title}`,
              animate: { rotate: rotation },
              className: `w-[460px] h-[280px] flex rounded-[20px] flex-col card card-active shadow-xl relative cursor-pointer bg-white ${idx >= 2 ? '-mt-[60px]' : ''}`,
              style: {
                justifySelf: idx % 2 === 0 ? 'start' : 'end',
                alignSelf: idx < 2 ? 'end' : 'start',
                zIndex: 10 + idx,
              } as React.CSSProperties,
              whileHover: { scale: 1 },
              whileTap: { scale: 0.98 },
              onClick: (e: React.MouseEvent) => { e.stopPropagation(); onCollapse(); },
              role: 'button' as const,
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onCollapse(); } },
            };
            
            if (card.isCustomCard) {
              return (
                <CustomCard
                  key={card.alt || card.title}
                  card={card}
                  layoutId={commonProps.layoutId}
                  className={commonProps.className}
                  style={commonProps.style}
                  textSizes={DESKTOP_CONFIG.textSizes}
                  padding="p-8"
                  showIcon={true}
                  onClick={commonProps.onClick}
                  onKeyDown={commonProps.onKeyDown}
                />
              );
            }
            
            return (
              <motion.div
                key={card.alt || card.title}
                {...commonProps}
              >
                <Image
                  src={card.image}
                  alt={card.alt || ""}
                  className="h-full w-full object-cover pointer-events-none rounded-[20px]"
                  width={460}
                  height={280}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ===== MAIN COMPONENT =====
export default function ImageGroup({ images, title, excerpt, type }: ImageGroupProps) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

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

  // Convert images to card format and use first 3
  const displayCards: CardData[] = images.slice(0, 3).map((image, idx) => ({
    title: title || `Image ${idx + 1}`,
    alt: image.alt,
    subtitle: type || 'content',
    description: excerpt || image.alt,
    longDescription: excerpt || image.alt,
    image: image.src,
    logo: image.src,
  }));

  // Add custom card as the 4th card
  if (displayCards.length > 0) {
    displayCards.push({
      title: title || 'Read More',
      alt: `${title || 'Content'} - Read More`,
      subtitle: type || 'content',
      description: excerpt || `Explore more about ${title || 'this content'} and discover related topics.`,
      longDescription: excerpt || 'Read more content',
      image: "",
      logo: "",
      isCustomCard: true,
    });
  }

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  // Render based on device type
  if (isMobile) {
    return (
      <div 
        className={`grid place-items-center relative ${MOBILE_CONFIG.containerHeight} w-full m-auto`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false}>
          {!expanded &&
            displayCards.slice(0, 3).map((card, idx) => (
              <MobileCard
                key={card.alt || card.title}
                card={card}
                idx={idx}
                totalCards={3}
                onExpand={() => setExpanded(true)}
                isHovered={isHovered}
              />
            ))}
          {expanded && (
            <MobileExpandedCardGrid
              cards={displayCards}
              onCollapse={() => setExpanded(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (isTablet) {
    return (
      <div 
        className={`grid place-items-center relative ${TABLET_CONFIG.containerHeight} w-full m-auto`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false}>
          {!expanded &&
            displayCards.slice(0, 3).map((card, idx) => (
              <TabletCard
                key={card.alt || card.title}
                card={card}
                idx={idx}
                totalCards={3}
                onExpand={() => setExpanded(true)}
                isHovered={isHovered}
              />
            ))}
          {expanded && (
            <TabletExpandedCardGrid
              cards={displayCards}
              onCollapse={() => setExpanded(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop (default)
  return (
    <div 
      className={`grid place-items-center relative ${DESKTOP_CONFIG.containerHeight} w-full m-auto`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        {!expanded &&
          displayCards.slice(0, 3).map((card, idx) => (
            <DesktopCard
              key={card.alt || card.title}
              card={card}
              idx={idx}
              totalCards={3}
              onExpand={() => setExpanded(true)}
              isHovered={isHovered}
            />
          ))}
        {expanded && (
          <DesktopExpandedCardGrid
            cards={displayCards}
            onCollapse={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


