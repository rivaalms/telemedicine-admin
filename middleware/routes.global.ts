export default defineNuxtRouteMiddleware(async (to, from) => {
   const route = useRouter().getRoutes().find(item => item.name === to.name)
   if (route) {
      let roledRoutes = useRoutes.find(item => item.to === route.path || item.children?.find(child => child.to === route.path))

      if (roledRoutes) {
         if (roledRoutes.children) {
            roledRoutes = roledRoutes.children.find(child => child.to === route.path)
         }
         const userRole = useAuthStore().getRole
         if (roledRoutes?.roles !== '*' && !roledRoutes?.roles?.includes(userRole)) return navigateTo('/error/403')
      }
   } else return navigateTo('/error/404', { replace: true })
})