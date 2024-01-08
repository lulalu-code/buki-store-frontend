/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      'mobile': '300px',
      // => @media (min-width: 300px) { ... }

      'tablet': '540px',
      // => @media (min-width: 540px) { ... }

      'intermediate': '780px',
      // => @media (min-width: 710px) { ... }

      'laptop': '1200px',
      // => @media (min-width: 1200px) { ... }

      'desktop': '1500px',
      // => @media (min-width: 1500px) { ... }
    },
  }
}

