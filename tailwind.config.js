/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "360px", // Extra small screens
      sm: "480px", // Small screens
      md: "640px", // Medium screens
      lg: "768px", // Large screens
      xl: "1024px", // Extra large screens
      "2xl": "1280px", // 2 Extra large screens
    },

    extend: {},
  },
  plugins: [],
};
