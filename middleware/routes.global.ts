export default defineNuxtRouteMiddleware(async (to, from) => {
   const excludedRoutes = [ '/login', '/forgot-password', '/error/404', '/error/403', '/profile' ]

   if (!excludedRoutes.includes(to.path)) {
      let route = useRoutes.find((route) => route.to === to.path || route.children?.find(child => child.to === to.path))
      if (route?.children) route = route.children.find((child) => child.to === to.path)

      if (!route) return navigateTo('/error/404', { replace: true })
      const role = useAuthStore().getRole
      if (route.roles !== '*' && !route?.roles?.includes(role)) return navigateTo('/error/403', { replace: true })
   }
})