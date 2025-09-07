'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  children: ReactNode;
  overlayClassName?: string;
  contentClassName?: string;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
  animationConfig?: {
    overlay?: {
      initial?: any;
      animate?: any;
      exit?: any;
      transition?: any;
    };
    content?: {
      initial?: any;
      animate?: any;
      exit?: any;
      transition?: any;
    };
  };
}

export function Modal({
  open,
  onOpenChange,
  trigger,
  children,
  overlayClassName = 'fixed inset-0 z-50 bg-black/20 backdrop-blur-sm',
  contentClassName = 'fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2',
  showOverlay = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  lockBodyScroll = true,
  animationConfig = {},
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const defaultOverlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  const defaultContentAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
      duration: 0.4,
    },
  };

  const overlayAnimation = { ...defaultOverlayAnimation, ...animationConfig.overlay };
  const contentAnimation = { ...defaultContentAnimation, ...animationConfig.content };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onOpenChange, closeOnEscape]);

  useEffect(() => {
    if (!lockBodyScroll) return;

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, lockBodyScroll]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onOpenChange(false);
    }
  };

  const portalContent = (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {showOverlay && (
            <motion.div
              className={overlayClassName}
              initial={overlayAnimation.initial}
              animate={overlayAnimation.animate}
              exit={overlayAnimation.exit}
              transition={overlayAnimation.transition}
              onClick={handleOverlayClick}
            />
          )}
          <motion.div
            ref={modalRef}
            className={contentClassName}
            initial={contentAnimation.initial}
            animate={contentAnimation.animate}
            exit={contentAnimation.exit}
            transition={contentAnimation.transition}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (trigger) {
    return (
      <>
        <div onClick={() => onOpenChange(true)}>{trigger}</div>
        {mounted && createPortal(portalContent, document.body)}
      </>
    );
  }

  return mounted ? createPortal(portalContent, document.body) : null;
}
