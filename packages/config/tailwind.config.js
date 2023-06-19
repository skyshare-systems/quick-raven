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
    colors: {
      primary: "#1CACEF",
      secondary: "#EFC81C",
      accent: "#C91CEF",
      error: "#EF1C42",
      success: "#1CEF5F",
      black: "#101010",
      white: "#FFFFFF",
    },

    //Opacity
    opacity: {
      8: ".08",
      12: ".12",
      16: ".16",
      32: ".32",
    },
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
    },
  },
  plugins: [],
};
