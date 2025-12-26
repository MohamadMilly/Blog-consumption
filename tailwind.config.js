// tailwind.config.js
import flowbitePlugin from "flowbite/plugin";
import scrollbar from "tailwind-scrollbar";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dropdown: {
          from: { transform: "scaleY(0)", opacity: "0" },
          to: { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        dropdown: "dropdown 0.5s ease-in forwards",
      },
    },
  },
  plugins: [flowbitePlugin, scrollbar],
};
