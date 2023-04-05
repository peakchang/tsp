/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  screens: {
    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '980px',
    // => @media (min-width: 768px) { ... }

    'lg': '1200px',
    // => @media (min-width: 1024px) { ... }
  },
  plugins: [],
}
