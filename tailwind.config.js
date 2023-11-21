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
            'cobalt': {
               '50': '#f0f6fe',
               '100': '#dcebfd',
               '200': '#c2dcfb',
               '300': '#98c7f8',
               '400': '#67a9f3',
               '500': '#4388ee',
               '600': '#2d6ae3',
               '700': '#2556d0',
               '800': '#21409a',
               '900': '#233e85',
               '950': '#1a2751',
            },
            'persian-green': {
               '50': '#effefb',
               '100': '#c7fff6',
               '200': '#90ffec',
               '300': '#51f7e2',
               '400': '#1de4d1',
               '500': '#04c8b8',
               '600': '#00a79d',
               '700': '#05807a',
               '800': '#0a6562',
               '900': '#0d5451',
               '950': '#003333',
         },
         }
      },
   },
   plugins: [],
}