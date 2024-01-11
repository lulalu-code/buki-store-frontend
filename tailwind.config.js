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

      'laptop': '1100px',
      // => @media (min-width: 1100px) { ... }

      'desktop': '1500px',
      // => @media (min-width: 1500px) { ... }
    },
  }
}

