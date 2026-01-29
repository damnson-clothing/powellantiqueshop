import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { username, password } = body

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: 'Username and password are required'
    })
  }

  try {
    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { username }
    })

    if (!admin || !admin.isActive) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash)

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    })

// Generate JWT token using jose
    const secret = new TextEncoder().encode(config.jwtSecret)
    const token = await new SignJWT({
      id: admin.id,
      username: admin.username,
      email: admin.email
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret)

    // Set token as HTTP-only cookie
    setCookie(event, 'admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    })

    return {
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName
      }
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      message: 'Error during login'
    })
  }
})
