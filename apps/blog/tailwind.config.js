/** @type {import('tailwindcss').Config} */
import uiConfig from '@repo/ui/tailwind-config';

export default {
  ...uiConfig,
  content: [
    ...uiConfig.content,
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};
