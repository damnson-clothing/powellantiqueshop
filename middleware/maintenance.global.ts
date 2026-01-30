export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  
  // Check if maintenance mode is enabled
  const isMaintenanceMode = config.public.maintenanceMode === 'true'
  
  // Allow access to maintenance page itself
  if (to.path === '/maintenance') {
    return
  }
  
  // Redirect to maintenance page if maintenance mode is enabled
  // This now includes admin routes - entire site is locked down
  if (isMaintenanceMode) {
    return navigateTo('/maintenance')
  }
})
