/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      dropShadow: {
        "3xl": [
          "5px 10px 10px rgba(255, 255, 255, 0.4)",
          "10px 45px 25px rgba(255,255,255,0.4)",
        ],
        "4xl": [
          "5px 10px 10px rgba(0, 0, 0, 0.55)",
          "10px 45px 25px rgba(0,0,0,0.55)",
        ],
      },
    },
  },
  plugins: [],
};
