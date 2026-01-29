import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Verify authentication
  await verifyAdminAuth(event)

  const productId = getRouterParam(event, 'id')

  if (!productId) {
    throw createError({
      statusCode: 400,
      message: 'Product ID is required'
    })
  }

  try {
    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    })

    if (!existingProduct) {
      throw createError({
        statusCode: 404,
        message: 'Product not found'
      })
    }

    // Delete product
    await prisma.product.delete({
      where: { id: productId }
    })

    return { success: true, message: 'Product deleted successfully' }
  } catch (error: any) {
    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      message: 'Error deleting product'
    })
  }
})
