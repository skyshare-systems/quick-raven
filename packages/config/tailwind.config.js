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
    opacity: {
      8: 0.08,
      12: 0.12,
      16: 0.16,
      32: 0.32,
      50: 0.5,
    },
    extend: {
      screens: {
        xsm: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
