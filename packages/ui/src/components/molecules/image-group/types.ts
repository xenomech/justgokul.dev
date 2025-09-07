import React from 'react';

export interface ImageCard {
  src: string;
  alt: string;
  width: number;
  height: number;
  _identity: string;
}

export interface CustomCardConfig {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

export interface ImageGroupConfig {
  _identity: string;
  images: ImageCard[];
  title?: string;
  excerpt?: string;
  type?: string;
  maxDisplayImages?: number;
  customCard?: CustomCardConfig;
}

export interface DeviceConfig {
  cardDimensions: { width: number; height: number };
  containerHeight: string;
  expandedModal: { width: string; height: string; padding: string };
  borderRadius: number;
  textSizes: {
    title: string;
    description: string;
    button: string;
  };
}

export type TailwindBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type BreakpointConfigs = Record<TailwindBreakpoint, DeviceConfig>;

export interface CardData {
  _identity: string;
  title: string;
  alt: string;
  description: string;
  image: string;
  isCustomCard?: boolean;
  customComponent?: React.ComponentType<any>;
  customProps?: Record<string, any>;
}

export interface CollapsedCardProps {
  card: CardData;
  index: number;
  totalCards: number;
  onExpand: () => void;
  isHovered: boolean;
  isPressed: boolean;
  deviceConfig: DeviceConfig;
}

export interface ExpandedViewProps {
  cards: CardData[];
  deviceConfig: DeviceConfig;
  breakpoint: TailwindBreakpoint;
}

export interface ImageGroupProps {
  config: ImageGroupConfig;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
