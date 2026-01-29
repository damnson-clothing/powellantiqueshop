import type { H3Event } from 'h3'

export async function verifyAdminAuth(event: H3Event) {
  const config = useRuntimeConfig()
  const token = getCookie(event, 'admin_token')
  
  // Validate JWT secret is configured
  if (!config.jwtSecret) {
    throw createError({
      statusCode: 500,
      message: 'Server configuration error - JWT secret not set'
    })
  }
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized - No token provided'
    })
  }

  try {
    // Dynamic import for better bundling compatibility
    const jwt = await import('jsonwebtoken')
    const decoded = jwt.default.verify(token, config.jwtSecret) as { id: string; username: string; email: string }
    return decoded
  } catch (err) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }
}
