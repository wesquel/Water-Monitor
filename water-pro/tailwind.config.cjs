/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      mainBlue: "#00A6FB",
      mainWhite: "#ECEBF3",
      mainBlack: "#33312E",
      secondBlack: "#242424",
    },
    extend: {
      gridTemplateRows: {
        chartMobile: "repeat(4, minmax(0, 60vw))",
      },
    },
  },
  plugins: [],
};
