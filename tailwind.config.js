/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./src/**/*.ejs",
  "./src/views/**/*.ejs",
  "./src/views/login/**/*.ejs",
  "./src/views/layout/**/*.ejs",
  "./src/views/home/**/*.ejs",
  "./src/views/errors/**/*.ejs",
  "./src/views/albums/**/*.ejs",
],

  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      },
    },
  },
  plugins: [],
}

