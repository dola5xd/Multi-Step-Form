/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        // Primary

        marine_Blue: "hsl(213, 96%, 18%)",
        Purplish_Blue: "hsl(243, 100%, 62%)",
        Pastel_Blue: "hsl(228, 100%, 84%)",
        Light_Blue: "hsl(206, 94%, 87%)",
        Strawberry_red: "hsl(354, 84%, 57%)",

        // Neutral

        Cool_gray: "hsl(231, 11%, 63%)",
        Light_gray: "hsl(229, 24%, 87%)",
        Magnolia: "hsl(217, 100%, 97%)",
        Alabaster: "hsl(231, 100%, 99%)",
      },
      backgroundImage: {
        mobile_bannar: 'url("../images/bg-sidebar-mobile.svg")',
        desktop_bannar: 'url("../images/bg-sidebar-desktop.svg")',
      },
    },
  },
  plugins: [],
};
