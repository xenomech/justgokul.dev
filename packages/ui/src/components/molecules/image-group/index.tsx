export { default as ImageGroup } from './image-group';

export type {
  ImageCard,
  CustomCardConfig,
  ImageGroupConfig,
  DeviceConfig,
  TailwindBreakpoint,
  BreakpointConfigs,
  CardData,
  CollapsedCardProps,
  ExpandedViewProps,
  ImageGroupProps,
} from './types';

export {
  ROTATION_CONFIG,
  BREAKPOINT_CONFIGS,
  EXPANDED_OFFSETS,
  EXPANDED_ROTATIONS,
  getOffset,
  getBreakpointConfig,
  getBreakpointFromWidth,
} from './config';
