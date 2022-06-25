module.exports = {
 
    content: [
      "./src/js/cart.js",
      "./src/js/index.js",
      "./index.html",
      "./public/**/*.{html,js}"
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/aspect-ratio'),
      // ...
    ],
  }