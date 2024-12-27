/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/src/**/*.{tsx,js,css}",
    "./src/**/*.{tsx,js,css}", // Scan the src folder for .tsx, .js, .css files
    "./pages/**/*.{tsx,js,css}", // If you have a pages folder (common with Next.js)
    "./components/**/*.{tsx,js,css}" // I
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

