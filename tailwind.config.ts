import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6A4F',
          pastel: '#E8F0EB',
          hover: '#24553F',
          light: '#52B788',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F4F4F0',
        },
        background: '#FBFBF9',
        text: {
          primary: '#1E2421',
          secondary: '#5C6560',
          muted: '#8C9690',
        },
        border: {
          DEFAULT: '#E5E8E4',
          subtle: '#EEF0EC',
        },
        accent: {
          gold: '#D4A373',
          'gold-subtle': '#FAF3EB',
        },
        destructive: {
          DEFAULT: '#C85A54',
          subtle: '#FAEDED',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-commissioner)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.02em',
        tighter: '-0.015em',
        tight: '-0.01em',
        normal: '0em',
        relaxed: '0.01em',
      },
      lineHeight: {
        snug: '1.15',
        tight: '1.25',
        relaxed: '1.55',
        loose: '1.6',
      },
      borderRadius: {
        xl: '12px',
        lg: '8px',
        md: '6px',
        sm: '4px',
        full: '9999px',
      },
      // Strict zero elevation: eradicate all Tailwind shadow classes
      boxShadow: {
        none: 'none',
        sm: 'none',
        DEFAULT: 'none',
        md: 'none',
        lg: 'none',
        xl: 'none',
        '2xl': 'none',
        inner: 'none',
      },
    },
  },
  plugins: [],
};

export default config;
