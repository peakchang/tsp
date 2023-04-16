/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    // colors : {
    //   "mpurple" : "#6b6998"
    // },
    extend: {
      screens: {
        'md': '860px',
        // => @media (min-width: 768px) { ... }
      },
    },
  },

  plugins: [],
}
