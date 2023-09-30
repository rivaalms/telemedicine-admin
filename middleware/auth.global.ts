export default defineNuxtRouteMiddleware(async (to, from) => {
   const authStore = useAuthStore()
   if (to.path !== '/login' && !authStore.isLoggedIn) navigateTo('/login')
   else if (to.path === '/login' && authStore.isLoggedIn) navigateTo('/')
})