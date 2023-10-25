export default defineNuxtRouteMiddleware(async (to, from) => {
   const authStore = useAuthStore()
   const excludedRoutes = [
      '/login',
      '/forgot-password'
   ]

   if (!excludedRoutes.includes(to.path) && !authStore.isLoggedIn) return navigateTo('/login')
   else if (excludedRoutes.includes(to.path) && authStore.isLoggedIn) return navigateTo('/', { replace: true })
})