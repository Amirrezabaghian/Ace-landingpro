import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
        'mlg': '860px',
        'xlg': '1110px',
        '3xl': '1600px',
      },

      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#252525',
      },
    },
  },
  plugins: [],
};
export default config;
