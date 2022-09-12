/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "theme-primary": "var(--primary)",
        "theme-secondary": "var(--secondary)",
        "theme-tertiary": "var(--tertiary)",
        "theme-background": "var(--background)",
        "theme-surface": "var(--surface)",
        "theme-error": "var(--error)",
        "theme-on-primary": "var(--on-primary)",
        "theme-on-secondary": "var(--on-secondary)",
        "theme-on-background": "var(--on-background)",
        "theme-on-surface": "var(--on-surface)",
        "theme-on-error": "var(--on-error)",
        "theme-shadow": "var(--shadow)",
      },
      fontFamily: {
        "space-mono-regular": ["Space Mono Regular", "sans-serif"],
        "space-mono-bold": ["Space Mono Bold", "sans-serif"],
        "cascadia-code": ["Cascadia Code", "sans-serif"],
        "roboto-condensed": ["Roboto Condensed", "sans-serif"],
        workSans: ["WorkSans", "sans-serif"],
      },
      screens: {
        wide: "1600px",
      },
    },
  },
  plugins: [require("daisyui")]
}
