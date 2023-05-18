/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../apps/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      //Screens
      screens: {
        xsm: "375px",
        // => @media (min-width: 375px) { ... }

        sm: "640px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
        "2xl": "1536px",
        // => @media (min-width: 1440px) { ... }
      },

      //Colors

      colors: {
        primary: {
          100: "#D2EEFC",
          200: "#A4DEF9",
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },

      // backgroundImage: {
      //   neutral:
      //     "radial-gradient(80.98% 100% at 50% 0%, #545454 0%, rgba(84, 84, 84, 0) 100%), #141414)",
      // },
    },
  },
  plugins: [],
};
