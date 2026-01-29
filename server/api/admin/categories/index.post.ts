import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  description: z.string().optional()
})

export default defineEventHandler(async (event) => {
  // Verify authentication
  await verifyAdminAuth(event)

  try {
    const body = await readBody(event)
    const validatedData = categorySchema.parse(body)

    // Generate slug from category name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    })

    if (existingCategory) {
      throw createError({
        statusCode: 400,
        message: 'A category with this name already exists'
      })
    }

    const category = await prisma.category.create({
      data: {
        name: validatedData.name,
        description: validatedData.description,
        slug
      }
    })

    return category
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      message: error.message || 'Error creating category'
    })
  }
})
