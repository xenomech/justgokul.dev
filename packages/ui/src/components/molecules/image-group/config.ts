import { DeviceConfig, BreakpointConfigs } from './types';

export const ROTATION_CONFIG = {
  min: -4,
  max: 4,
} as const;

export const BREAKPOINT_CONFIGS: BreakpointConfigs = {
  sm: {
    cardDimensions: { width: 280, height: 170 },
    containerHeight: 'h-44',
    expandedModal: { width: 'w-[90vw]', height: 'h-[70vh] max-h-[750px]', padding: 'p-3' },
    borderRadius: 16,
    textSizes: {
      title: 'text-lg',
      description: 'text-sm',
      button: 'px-3 py-2 text-sm',
    },
  },
  md: {
    cardDimensions: { width: 320, height: 190 },
    containerHeight: 'h-52',
    expandedModal: { width: 'w-[85vw] max-w-md', height: 'h-[85vh] max-h-[750px]', padding: 'p-4' },
    borderRadius: 17,
    textSizes: {
      title: 'text-lg',
      description: 'text-sm',
      button: 'px-4 py-2 text-sm',
    },
  },
  lg: {
    cardDimensions: { width: 380, height: 230 },
    containerHeight: 'h-64',
    expandedModal: {
      width: 'w-[60vw] max-w-2xl',
      height: 'h-[80vh] max-h-[750px]',
      padding: 'p-6',
    },
    borderRadius: 18,
    textSizes: {
      title: 'text-xl',
      description: 'text-base',
      button: 'px-5 py-2.5 text-base',
    },
  },
  xl: {
    cardDimensions: { width: 420, height: 250 },
    containerHeight: 'h-72',
    expandedModal: {
      width: 'w-[55vw] max-w-4xl',
      height: 'h-[80vh] max-h-[850px]',
      padding: 'p-7',
    },
    borderRadius: 19,
    textSizes: {
      title: 'text-xl',
      description: 'text-base',
      button: 'px-5 py-2.5 text-base',
    },
  },
  '2xl': {
    cardDimensions: { width: 420, height: 250 },
    containerHeight: 'h-72',
    expandedModal: {
      width: 'w-[60vw] max-w-4xl',
      height: 'h-[80vh] max-h-[850px]',
      padding: 'p-7',
    },
    borderRadius: 19,
    textSizes: {
      title: 'text-xl',
      description: 'text-base',
      button: 'px-5 py-2.5 text-base',
    },
  },
};

export const EXPANDED_OFFSETS = [
  { dx: -1, dy: -1 },
  { dx: 1, dy: -1 },
  { dx: -1, dy: 1 },
  { dx: 1, dy: 1 },
] as const;

export const EXPANDED_ROTATIONS = [0, 5, -5, 2] as const;

export function getOffset(idx: number) {
  const { dx, dy } = EXPANDED_OFFSETS[idx] || { dx: 0, dy: 0 };
  const rotation = EXPANDED_ROTATIONS[idx] ?? 0;
  return { dx, dy, rotation };
}

export function getBreakpointConfig(breakpoint: keyof BreakpointConfigs): DeviceConfig {
  return BREAKPOINT_CONFIGS[breakpoint];
}

export function getBreakpointFromWidth(width: number): keyof BreakpointConfigs {
  if (width >= 1536) return '2xl'; // 2xl: 1536px+
  if (width >= 1280) return 'xl'; // xl: 1280px+
  if (width >= 1024) return 'lg'; // lg: 1024px+
  if (width >= 768) return 'md'; // md: 768px+
  return 'sm'; // sm: 640px+ (default)
}
