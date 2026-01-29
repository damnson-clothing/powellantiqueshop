export default defineEventHandler(async (event) => {
  // Clear the admin token cookie
  deleteCookie(event, 'admin_token')

  return {
    success: true,
    message: 'Logged out successfully'
  }
})
