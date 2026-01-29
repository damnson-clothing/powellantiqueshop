import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })

    return categories
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Error fetching categories'
    })
  }
})
