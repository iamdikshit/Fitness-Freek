/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundColor: {
        white: "#ffffff",
        "dark-gray": "#333333",
        "light-gray": "#4d4d4d",
        "gray-000": "#f8f9fa",
        "gray-100": "#f1f3f5",
        "gray-500": "#adb5bd",
        "yellow-200": "#ffe066",
        "yellow-700": "#e67700",
        "red-700": "#f03e3e",
        "red-100": "#fff5f5",
        "red-200": "#ffe3e3",
        "green-700": "#37b24d",
        black: "#000000",
        "black-100": "#e6e6e6",
        "slate-900": "#1f2937",
      },
    },
  },
  plugins: [],
};
