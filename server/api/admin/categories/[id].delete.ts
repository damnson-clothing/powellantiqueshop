import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!existingCategory) {
      throw createError({
        statusCode: 404,
        message: 'Category not found'
      })
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      throw createError({
        statusCode: 400,
        message: `Cannot delete category with ${existingCategory._count.products} product(s). Please reassign or delete the products first.`
      })
    }

    // Delete category
    await prisma.category.delete({
      where: { id: categoryId }
    })

    return {
      success: true,
      message: 'Category deleted successfully'
    }
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      message: error.message || 'Error deleting category'
    })
  }
})
