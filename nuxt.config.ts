// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
		head: {
			titleTemplate: "%s | Telemedicine Admin",
			htmlAttrs: {
				lang: "id",
			},
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ hid: "description", name: "description", content: "" },
				{ name: "format-detection", content: "telephone=no" },
				{ charset: "utf-8" },
			],
		},
	},
  
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
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ],

  imports: {
    presets: [
      { from: '@/utils/stores/auth', imports: ['useAuthStore'] }
    ]
  },

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
