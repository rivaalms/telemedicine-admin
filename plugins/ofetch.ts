import { ofetch } from 'ofetch'

export default defineNuxtPlugin((nuxtApp) => {
   const authStore = useAuthStore()
   const config = useRuntimeConfig()

   globalThis.$fetch = ofetch.create({
      baseURL: `${config.public.apiBaseUrl}`,

      async onRequest({ options, error }: any) {
         if (authStore.isLoggedIn) {
            options.headers = {
               'Authorization': `Bearer ${authStore.getUser['AUTH-TOKEN']}`,
               'Accept': 'application/json'
            }
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
         // const errorMessageFromApi = response._data.data.message || response._data.data.messages || null
         console.log('ofetchOnResponseError', response)
         if (response.status == 401) {
            authStore.$reset()
            if (localStorage.getItem('user')) localStorage.removeItem('user')
            navigateTo('/login')
         }
      }
   })
})