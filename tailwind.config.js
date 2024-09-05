/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
     "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        '9xl': '767px',
      
      },
    },
  },
  plugins: [require('flowbite/plugin') ],
}




