/** @type {import('tailwindcss').Config} */
const H = {
  lineHeight: "auto",
  letterSpacing: "0",
  fontWeight: "700",
};
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#042B82",
        "secondary-color": "#FFFFFF",
        "gray-ligth-color": "#F3F3F3",
        "gray-color": "#CCCCCC",
        "gray-dark-color": "#666666",
        "black-color": "#000000",
        "title-color": "#333333",
        "text-color": "#222222",
      },
    },
    fontSize: {
      h1: ["2rem"],
      h2: ["1.5rem"],
      h3: ["1.25rem"],
      h4: ["1rem"],
      h5: ["0.813rem"],
      h6: ["0.688rem"],
      normal: ["1rem"],
      small: ["0.688rem"],
    },
    screens: {
      desktop: "834px",
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkt-scrollbarr": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
