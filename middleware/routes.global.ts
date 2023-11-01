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

         // Get the user's role
         const userRole = useAuthStore().getRole

         // If the role is superAdmin, do not validate the route rules
         if (userRole !== 'superAdmin') {
            // Check if the role exist in route's roles. If the role doesn't exist, return 403
            if (roledRoutes?.roles !== '*' && !roledRoutes?.roles?.includes(userRole)) return navigateTo('/error/403')
         }
      }
   } else return navigateTo('/error/404', { replace: true })
})