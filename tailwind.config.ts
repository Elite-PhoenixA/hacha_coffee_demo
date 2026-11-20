import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hacha: {
          50: '#F4F7F9',
          100: '#E6EDF2',
          200: '#CDDCE6',
          300: '#A6C2D4',
          400: '#75A2BD',
          500: '#4E83A4',
          600: '#3D6B88',
          700: '#32566F',
          800: '#2C495D',
          900: '#1A2C38',
          950: '#0F1A22',
        },
        frost: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        glacier: {
          light: '#EAF4F8',
          DEFAULT: '#99C7D7',
          dark: '#588899',
        },
      },
      fontFamily: {
        sans: ['var(--font-vietnam)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'frost-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(240,248,255,0.6) 100%)',
      },
      boxShadow: {
        'frost-sm': '0 2px 10px rgba(15, 23, 42, 0.04)',
        'frost': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 0 1px 1px rgba(226, 232, 240, 0.6)',
        'frost-lg': '0 20px 40px -10px rgba(15, 23, 42, 0.09), 0 0 1px 1px rgba(203, 213, 225, 0.5)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
