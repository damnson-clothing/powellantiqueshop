import type { H3Event } from 'h3'
import { jwtVerify } from 'jose'

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
    // Verify JWT token using jose
    const secret = new TextEncoder().encode(config.jwtSecret)
    const verified = await jwtVerify(token, secret)
    return verified.payload as { id: string; username: string; email: string }
  } catch (err) {
    throw createError({
      statusCode: 401,
      message: 'Invalid or expired token'
    })
  }
}
