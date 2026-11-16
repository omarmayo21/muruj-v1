/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Cairo"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cairo"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        limestone: '#F6F3EC',
        travertine: '#EBE5D8',
        sandstone: '#DFD6C5',
        hairline: '#D8D0C1',
        cypress: {
          950: '#08241C',
          900: '#0D3B2E',
          800: '#144B3B',
          700: '#1D5E4A',
          100: '#DCEAE4',
          50: '#EEF5F2',
        },
        bronze: {
          800: '#6E4B22',
          700: '#8C6230',
          600: '#A4743D',
          500: '#B8864B',
          400: '#CCA068',
          300: '#DEC094',
          100: '#F5EBD9',
        },
        ink: {
          950: '#13221D',
          800: '#263B34',
          600: '#475E56',
          400: '#6B827A',
        },
      },
      boxShadow: {
        atelier: '0 14px 34px -10px rgba(13, 59, 46, 0.10), 0 4px 12px -4px rgba(19, 34, 29, 0.06)',
        desk: '0 24px 52px -14px rgba(8, 36, 28, 0.24), 0 8px 20px -6px rgba(19, 34, 29, 0.12)',
      },
    },
  },
  plugins: [],
};

