/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563EB",     // primary blue
          50: "#EAF2FF",
          100: "#D7E9FF",
          200: "#AED3FF",
          300: "#84BBFF",
          400: "#5B9FFF",
          500: "#2563EB",
          600: "#1F53C6",
          700: "#173F96",
          800: "#102B66",
        },
        brandAccent: "#8B5CF6",   // optional brand purple
        brandSuccess: "#22C55E"   // success (done)
      }
    },
  },
  plugins: [],
};
