export default defineNuxtRouteMiddleware(async (to, from) => {
   const authStore = useAuthStore()
   // Define routes that doesn't need authentication validation
   const excludedRoutes = [
      '/login',
      '/forgot-password'
   ]

   // If the user visits any route except excluded ones AND the user hasn't logged in, redirects user to login page
   if (!excludedRoutes.includes(to.path) && !authStore.isLoggedIn) return navigateTo('/login')

   // If the user visits any of excluded routes AND the user has logged in, redirects user to home page
   else if (excludedRoutes.includes(to.path) && authStore.isLoggedIn) return navigateTo('/', { replace: true })
})