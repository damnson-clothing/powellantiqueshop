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

  const categoryId = getRouterParam(event, 'id')

  if (!categoryId) {
    throw createError({
      statusCode: 400,
      message: 'Category ID is required'
    })
  }

  try {
    const body = await readBody(event)
    const validatedData = categorySchema.parse(body)

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!existingCategory) {
      throw createError({
        statusCode: 404,
        message: 'Category not found'
      })
    }

    // Generate new slug if name changed
    let slug = existingCategory.slug
    if (validatedData.name !== existingCategory.name) {
      slug = validatedData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      // Check if new slug conflicts with another category
      const slugConflict = await prisma.category.findFirst({
        where: {
          slug,
          id: { not: categoryId }
        }
      })

      if (slugConflict) {
        throw createError({
          statusCode: 400,
          message: 'A category with this name already exists'
        })
      }
    }

    const category = await prisma.category.update({
      where: { id: categoryId },
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
      message: error.message || 'Error updating category'
    })
  }
})
