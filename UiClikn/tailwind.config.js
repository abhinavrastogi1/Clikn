/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "var(--custom-pink)",
        orange: "var(--custom-orange)",
      },
    },
  },
  plugins: [],
};
