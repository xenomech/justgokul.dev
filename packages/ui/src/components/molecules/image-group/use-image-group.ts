import { useEffect, useState, useCallback } from 'react';
import { useBreakpoint, useIsHydrated } from '../../../hooks';
import { CardData, ImageGroupConfig, TailwindBreakpoint } from './types';
import { BREAKPOINT_CONFIGS } from './config';

export function useImageGroup(
  config: ImageGroupConfig,
  isOpen?: boolean,
  onOpenChange?: (open: boolean) => void
) {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const breakpoint = useBreakpoint();
  const isHydrated = useIsHydrated();

  const isControlled = isOpen !== undefined;
  const expanded = isControlled ? isOpen : internalExpanded;

  const setExpanded = useCallback(
    (open: boolean) => {
      if (open !== expanded) {
        setIsAnimating(true);

        if (!isControlled) {
          setInternalExpanded(open);
        }
        onOpenChange?.(open);

        setTimeout(() => setIsAnimating(false), 300);
      }
    },
    [expanded, isControlled, onOpenChange]
  );

  const deviceConfig = BREAKPOINT_CONFIGS[breakpoint];

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [expanded]);

  const maxImages = config.maxDisplayImages || 3;
  const displayCards: CardData[] = config.images.slice(0, maxImages).map(image => ({
    _identity: image._identity,
    title: config.title || image.alt,
    alt: image.alt,
    description: config.excerpt || image.alt,
    image: image.src,
  }));

  if (config.customCard && displayCards.length > 0) {
    displayCards.push({
      _identity: `${config._identity}-custom`,
      title: 'Custom Card',
      alt: `${config.title || 'Content'} - Custom Card`,
      description: 'Custom component',
      image: '',
      isCustomCard: true,
      customComponent: config.customCard.component,
      customProps: config.customCard.props,
    });
  }

  return {
    expanded,
    setExpanded,
    isHovered,
    setIsHovered,
    isPressed,
    setIsPressed,
    isAnimating,
    setIsAnimating,
    breakpoint,
    deviceConfig,
    displayCards,
    maxImages,
    isHydrated,
  };
}
