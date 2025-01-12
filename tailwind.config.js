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
        grayishSilver: "#B9B9B9",
        silver: "#B2B2B2",
        gunMetal: "#181A1D",
        richBlack: "#101113",
        platinum: "#E5E5E5",
        softGray: "#ccc",
        mediumGray: "#999999",
        jetBlack: "#0f0f0f",
        gainsBoro: "#D1D1D1",
        gray: "#D7D7D7",
        eclipseGray: "#242424",
        lightGray: "#F5F5F5",
        coolGray: "#848484",
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
        hoveredparrot : "#C4FF48",
        eerieBlack: "#1C1C1C",
        dimGray: "#666666",
        blackMarbel: "#161616",
        darkCharcoal: "#2B2B2B",
        "slateGray-2": "#58606B",
        grayBlue: "#68717E"
      },
      boxShadow: {
        'custom-inset': 'inset 0px 0px 4.5px 0px rgba(0, 0, 0, 0.30)',
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
