export default defineNuxtRouteMiddleware(async (to, from) => {
   const authStore = useAuthStore()
   if (to.path !== '/login' && !authStore.isLoggedIn) return navigateTo('/login')
   else if (to.path === '/login' && authStore.isLoggedIn) return navigateTo('/')
})