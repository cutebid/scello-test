/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryVariant: "#6E6893",
        fontPrimary: "#25213B",
        purple: "#6D5BD0",
        purpleTint: "#F2F0F9",
      },
    },
  },
  plugins: [],
};
