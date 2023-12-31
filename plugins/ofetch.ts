import { ofetch } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
   const authStore = useAuthStore()
   const config = useRuntimeConfig()

   globalThis.$fetch = ofetch.create({
      baseURL: `${config.public.apiBaseUrl}`,

      async onRequest({ options, error }) {
         if (authStore.isLoggedIn) {
            const headers = {
               ...options.headers,
               'Authorization': `Bearer ${authStore.getUser!['AUTH-TOKEN']}`,
               'Accept': 'application/json'
            }
            options.headers = headers
         }

         if (error) throw error
      },

      async onRequestError({ error }: any) {
         throw error
      },

      async onResponse({ response, error }: any) {
         if (error) throw error
         return response._data
      },

      async onResponseError({ response }: any) {
         if (response.status == 401) {
            authStore.$reset()
            if (localStorage.getItem('user')) localStorage.removeItem('user')
            navigateTo('/login')
         }
      }
   })
})