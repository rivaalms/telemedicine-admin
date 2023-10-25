export default defineNuxtRouteMiddleware(async (to, from) => {
   const excludedRoutes = [
      'login',
      'forgot-password',
      'error-code',
      'profile',
      'users-doctors-str'
   ]

   if (!excludedRoutes.includes(to.name as string)) {
      let route = useRoutes.find((route) => route.to === to.path || route.children?.find(child => child.to === to.path))
      if (route?.children) route = route.children.find((child) => child.to === to.path)

      if (!route) return navigateTo('/error/404', { replace: true })
      const role = useAuthStore().getRole
      if (route.roles !== '*' && !route?.roles?.includes(role)) return navigateTo('/error/403', { replace: true })
   }
})