/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: "var(--custom-blue)",
        orange: "var(--custom-orange)",
        DB: "#020617",
      },
    },
  },
  plugins: [],
};
