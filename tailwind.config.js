const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        gray: "#D7D7D7",
        eclipseGray: "#242424",
        lightGray: "#F5F5F5",
        coolGray: "#848484",
        neutralGray: "#666666",
        darkGray: "#131313",
        charcoalGray: "#3D3D3D",
        lightGreen: "#C4FF48",
        limeGreen: "#9EFF00",
        secondaryBlue: "#ACD7FF",
        darkRed: "#FF2424",
        green: "#92FF24",
        gainsboro: "rgba(213, 213, 213, 1)",
        borderColor: "rgba(104, 113, 126, 0.20)",
        bottonBorder: "rgba(104, 113, 126, 0.10)",
        slateGray: "rgba(104, 113, 126, 1)",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("flowbite/plugin")],
};
