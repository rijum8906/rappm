/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html",
    "./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      /* CLI_INJECT_TAILWIND */
    }
  }
}