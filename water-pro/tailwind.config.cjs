/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainBlue: "#00A6FB",
        mainBlueHover: "#0092dd",
        mainWhite: "#ECEBF3",
        mainBlack: "#33312E",
        secondBlack: "#242424",
      },
      gridTemplateRows: {
        chartMobile: "repeat(4, minmax(0, 60vw))",
        chartMobileCaixa: "repeat(5, minmax(0, 60vw))",
      },
      gridTemplateColumns: {
        serviceDashboardGrid: "0.5fr 1fr",
        serviceDashboardGridMobile: "auto 1fr",
      },
    },
  },
  plugins: [],
};
