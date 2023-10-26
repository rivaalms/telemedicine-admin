export default defineNuxtRouteMiddleware(async (to, from) => {
   // Find the route inside Nuxt Router. If route not found, return 404
   const route = useRouter().getRoutes().find(item => item.name === to.name)
   if (route) {
      // Find the route's roles validation inside the sidebar routes
      let roledRoutes = useRoutes.find(item => item.to === route.path || item.children?.find(child => child.to === route.path))

      // If the route exist, continue with roles validation. Else continue to the route (i.e. the route does not have roles validation)
      if (roledRoutes) {
         // If the route is a child route, extract the route from its parent
         if (roledRoutes.children) {
            roledRoutes = roledRoutes.children.find(child => child.to === route.path)
         }

         // Get the user's role, then check if the role exist in route's roles. If the role doen't exist, return 403
         const userRole = useAuthStore().getRole
         if (roledRoutes?.roles !== '*' && !roledRoutes?.roles?.includes(userRole)) return navigateTo('/error/403')
      }
   } else return navigateTo('/error/404', { replace: true })
})