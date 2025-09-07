import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PastelColor {
  background: string;
  text: string;
  border?: string;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function generatePastelColor(seed?: string, colorPalette?: string[]): PastelColor {
  const random = seed ? hashString(seed) : Math.random();

  let hue: number;
  let baseSaturation: number;
  let baseLightness: number;

  if (colorPalette && colorPalette.length > 0) {
    const colorIndex = Math.floor(random * colorPalette.length);
    const selectedColor = colorPalette[colorIndex];

    if (selectedColor) {
      const hsl = hexToHsl(selectedColor);
      hue = hsl.h;
      baseSaturation = hsl.s;
      baseLightness = hsl.l;
    } else {
      hue = Math.floor(random * 360);
      baseSaturation = 50;
      baseLightness = 50;
    }
  } else {
    hue = Math.floor(random * 360);
    baseSaturation = 50;
    baseLightness = 50;
  }

  const saturation = Math.min(70, Math.max(30, baseSaturation * 0.6));
  const lightness = Math.min(95, Math.max(85, baseLightness + 35));

  const background = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const textLightness = Math.max(20, lightness - 60);
  const textSaturation = Math.min(80, saturation + 20);
  const text = `hsl(${hue}, ${textSaturation}%, ${textLightness}%)`;

  const borderLightness = lightness - 5;
  const border = `hsl(${hue}, ${saturation}%, ${borderLightness}%)`;

  return {
    background,
    text,
    border,
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash) / 2147483647;
}
