'use client';

import { useEffect, useState } from 'react';
import { TailwindBreakpoint } from '../components/molecules/image-group/types';

interface ResponsiveState {
  breakpoint: TailwindBreakpoint;
  width: number;
  height: number;
}

const BREAKPOINTS = {
  sm: 640, // sm: 640px+
  md: 768, // md: 768px+
  lg: 1024, // lg: 1024px+
  xl: 1280, // xl: 1280px+
  '2xl': 1536, // 2xl: 1536px+
} as const;

function getBreakpointFromWidth(width: number): TailwindBreakpoint {
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  return 'sm';
}

function getInitialState(): ResponsiveState {
  if (typeof window === 'undefined') {
    return {
      breakpoint: 'lg', // Default to sm for better UX (scale up vs scale down)
      width: 0,
      height: 0,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    breakpoint: getBreakpointFromWidth(width),
    width,
    height,
  };
}

export function useResponsive(): ResponsiveState & { isHydrated: boolean } {
  const [state, setState] = useState<ResponsiveState>(getInitialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setState({
        breakpoint: getBreakpointFromWidth(width),
        width,
        height,
      });
    };

    setIsHydrated(true);
    updateDimensions();

    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return { ...state, isHydrated };
}

export function useIsHydrated(): boolean {
  const { isHydrated } = useResponsive();
  return isHydrated;
}

export function useIsSm(): boolean {
  const { breakpoint } = useResponsive();
  return breakpoint === 'sm';
}

export function useIsMd(): boolean {
  const { breakpoint } = useResponsive();
  return breakpoint === 'md';
}

export function useIsLg(): boolean {
  const { breakpoint } = useResponsive();
  return breakpoint === 'lg';
}

export function useIsXl(): boolean {
  const { breakpoint } = useResponsive();
  return breakpoint === 'xl';
}

export function useIs2xl(): boolean {
  const { breakpoint } = useResponsive();
  return breakpoint === '2xl';
}

export function useBreakpoint(): TailwindBreakpoint {
  const { breakpoint } = useResponsive();
  return breakpoint;
}

export function useBreakpointAtLeast(minBreakpoint: TailwindBreakpoint): boolean {
  const { breakpoint } = useResponsive();
  const breakpointOrder: TailwindBreakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  const minIndex = breakpointOrder.indexOf(minBreakpoint);
  return currentIndex >= minIndex;
}

export function useBreakpointAtMost(maxBreakpoint: TailwindBreakpoint): boolean {
  const { breakpoint } = useResponsive();
  const breakpointOrder: TailwindBreakpoint[] = ['sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(breakpoint);
  const maxIndex = breakpointOrder.indexOf(maxBreakpoint);
  return currentIndex <= maxIndex;
}
