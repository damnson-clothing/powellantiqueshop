export default defineEventHandler(async (event) => {
  try {
    const admin = await verifyAdminAuth(event)
    
    return {
      authenticated: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      }
    }
  } catch (error) {
    return {
      authenticated: false
    }
  }
})
