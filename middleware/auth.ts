export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on client-side for admin routes (except login)
  if (process.client && to.path.startsWith('/admin') && to.path !== '/admin/login') {
    try {
      // Check if user is authenticated by calling the auth API
      const { data } = await useFetch('/api/auth/me')
      
      if (!data.value || !data.value.authenticated) {
        return navigateTo('/admin/login')
      }
    } catch (error) {
      return navigateTo('/admin/login')
    }
  }
})
