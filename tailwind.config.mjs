/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'rgb(var(--color-canvas-rgb) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-canvas-rgb) / <alpha-value>)',
          primary: 'rgb(var(--color-surface-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-surface-secondary-rgb) / <alpha-value>)',
          contrast: 'rgb(var(--color-surface-contrast-rgb) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary-rgb) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted-rgb) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse-rgb) / <alpha-value>)',
        },
        line: 'rgb(var(--color-border-rgb) / <alpha-value>)',
        'editorial-black': 'rgb(var(--color-editorial-black-rgb) / <alpha-value>)',
        signal: 'rgb(var(--color-signal-rgb) / <alpha-value>)',
        live: 'rgb(var(--color-live-rgb) / <alpha-value>)',
        editorial: 'rgb(var(--color-editorial-accent-rgb) / <alpha-value>)',
        commercial: 'rgb(var(--color-commercial-rgb) / <alpha-value>)',
        link: 'rgb(var(--color-link-rgb) / <alpha-value>)',
        focus: 'rgb(var(--color-focus-rgb) / <alpha-value>)',
      },
      maxWidth: {
        editorial: 'var(--container-editorial)',
      },
      spacing: {
        'page-gutter': 'var(--gutter-page)',
        'v4-1': 'var(--space-1)',
        'v4-2': 'var(--space-2)',
        'v4-3': 'var(--space-3)',
        'v4-4': 'var(--space-4)',
        'v4-5': 'var(--space-5)',
        'v4-6': 'var(--space-6)',
        'v4-7': 'var(--space-7)',
        'v4-8': 'var(--space-8)',
        'v4-9': 'var(--space-9)',
        'v4-10': 'var(--space-10)',
        'header-sticky': 'var(--header-sticky-offset)',
      },
      borderRadius: {
        'v4-sm': 'var(--radius-sm)',
        'v4-md': 'var(--radius-md)',
        'v4-lg': 'var(--radius-lg)',
      },
      boxShadow: {
        'v4-resting': 'var(--shadow-resting)',
        'v4-raised': 'var(--shadow-raised)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'radar-sweep': 'radar-sweep 4s ease-in-out infinite',
        'pulse-cyan': 'pulse-cyan 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        'radar-sweep': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
        },
        'pulse-cyan': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 20px rgb(var(--color-link-rgb) / 0.1)' },
          '100%': { 'box-shadow': '0 0 40px rgb(var(--color-link-rgb) / 0.3)' },
        },
      },
      backgroundImage: {
        'radar-grid': `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300e5ff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
};
