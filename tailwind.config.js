/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'header-bg': '#d7eefa',
        'heading-txt': '#1D1D1B',
      },
    },
  },
  plugins: [],
}

