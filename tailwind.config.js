/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: {
            50: '#FDFBF0',
            100: '#FAF3D4',
            200: '#F5E5A8',
            300: '#EFD477',
            400: '#E5C158',
            DEFAULT: '#D4AF37',
            600: '#B8860B',
            700: '#996515',
            800: '#78510A',
            900: '#543907'
          },
          yellow: {
            50: '#FFFDF5',
            100: '#FEF9C3',
            200: '#FEF08A',
            DEFAULT: '#D4AF37',
            dark: '#B8860B',
            hover: '#E5C158'
          },
          blue: {
            50: '#F0F9FF',
            100: '#E0F2FE',
            DEFAULT: '#00A6FF',
            dark: '#0284C7',
            deep: '#0369A1'
          },
          dark: '#0B0F19',
          obsidian: '#070A10',
          charcoal: '#1E293B',
          accent: '#166534'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        'clean': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'clean-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'gold-sm': '0 2px 10px -2px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 4px 20px -2px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
