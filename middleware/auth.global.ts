import { ofetch } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to, from) => {
   const authStore = useAuthStore()
   const config = useRuntimeConfig()

   if (to.path !== '/login' && authStore.isLoggedIn) {
      globalThis.$fetch = ofetch.create({
         baseURL: `${config.public.apiBaseUrl}`,

         onRequest({ options, error }: any) {
            if (authStore.isLoggedIn) {
               options.headers = {
                  'Authorization': `Bearer ${authStore.getUser['AUTH-TOKEN']}`,
                  'Accept': 'application/json'
               }
            }

            if (error) throw error
         },

         onResponseError({ response }: any) {
            if (response.status == 401) {
               authStore.$reset()
               if (localStorage.getItem('user')) localStorage.removeItem('user')
               navigateTo('/login')
            }
         }
      })
   }
})