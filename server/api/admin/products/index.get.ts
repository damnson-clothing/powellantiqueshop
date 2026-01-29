import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Verify authentication
  await verifyAdminAuth(event)

  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return products
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error fetching products'
    })
  }
})
