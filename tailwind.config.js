module.exports = {
   content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
      "./utils/stores/**/*.{js,ts}"
   ],
   theme: {
      extend: {
         colors: {
            'froly': {
               '50': '#fdf3f3',
               '100': '#fce4e4',
               '200': '#fbcdcd',
               '300': '#f6abab',
               '400': '#f08080',
               '500': '#e44f4f',
               '600': '#d03232',
               '700': '#af2626',
               '800': '#912323',
               '900': '#792323',
               '950': '#410e0e',
               light: '#f6abab',
               DEFAULT: '#e44f4f',
               dark: '#af2626'
            },        
         }
      },
   },
   plugins: [],
}