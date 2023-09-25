// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      apiDokterUrl: '',
      parseUrl: '',
      faskesId: '',
      clientDomain: ''
    }
  },

  modules: [
    '@pinia/nuxt'
  ],

  css: ['@/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
})
