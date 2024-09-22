/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fff",
        secondary: "#000",
        gray50: "#FCFCFC",
        gray100: "#F2F2F2",
        gray200: "#e3e3e3",
        gray300: "#b7b7b7",
        gray400: "#646464",
        gray500: "#939393",
        gray900: "#333333",
      },
    },
  },
  plugins: [],
};
