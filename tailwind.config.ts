import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a0f1e',
        charcoal: '#141b2d',
        gold: '#c9a84c',
        teal: '#2dd4bf',
      },
      backgroundColor: {
        'dark-navy': '#0a0f1e',
        'dark-charcoal': '#141b2d',
      },
      textColor: {
        'gold': '#c9a84c',
        'teal': '#2dd4bf',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
