/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          100: '#F7F1E8',
        },
        dawn: {
          900: '#97948F',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
              textDecoration: 'none',
            },
            code: { color: theme('colors.blue.400') },
            blockquote: {
              borderLeftColor: theme('colors.blue.500'),
              color: theme('colors.gray.500'),
              backgroundColor: theme('colors.base.100'),
              fontStyle: 'normal',
            },
            pre: {
              backgroundColor: theme('colors.gray.100'),
              color: theme('colors.gray.500'),
              border: '1px solid rgba(0, 0, 0, 0.1)',
              fontFamily: theme('fontFamily.code'),
            },
            thead: {
              borderBottomColor: theme('colors.gray.200'),
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
      }),
      fontFamily: {
        inter: ['var(--font-inter)'],
        code: ['var(--font-code)'],
        emoji: ['var(--emoji)'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
