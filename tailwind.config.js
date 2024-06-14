/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins : "'Poppins', sans-serif",
        nunito : "'Nunito Sans', sans-serif",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui :{
    themes : [],
  }
}

