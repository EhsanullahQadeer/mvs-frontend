const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js','node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        darkGray: '#131313',
        gainsboro:"rgba(213, 213, 213, 1)",
        slateGray:"rgba(104, 113, 126, 1)"
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
