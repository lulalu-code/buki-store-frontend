/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      'tablet': '540px',
      // => @media (min-width: 540px) { ... }

      'laptop': '1200px',
      // => @media (min-width: 1300px) { ... }

      'desktop': '1500px',
      // => @media (min-width: 1500px) { ... }
    },
  }
}

