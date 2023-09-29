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
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous', },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200;0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;0,6..12,800;0,6..12,900;1,6..12,200;1,6..12,300;1,6..12,400;1,6..12,500;1,6..12,600;1,6..12,700;1,6..12,800;1,6..12,900&display=swap' }
      ]
		},
	},

  ssr: false,

	devServer: {
		port: 3001,
	},

  build: {
    transpile: [
      '@fawmi/vue-google-maps',
      '@vuepic/vue-datepicker'
    ]
  },
  
  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      apiDokterUrl: '',
      parseUrl: '',
      faskesId: '',
      clientDomain: '',
      parseKey: '',
      gmapKey: ''
    }
  },

  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui'
  ],

  imports: {
    presets: [
      { from: '@/utils/stores/app', imports: ['useAppStore'] },
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

  ui: {
    global: true,
    safelistColors: [
			'primary',
			'froly',
			'green',
			'red',
			'amber',
			'gray',
      'zinc',
      'blue',
      'cyan',
		]
  },

  colorMode: {
    preference: 'light'
  },

  vite: {
    define: {
      'process.env.DEBUG': false
    }
  }
})
