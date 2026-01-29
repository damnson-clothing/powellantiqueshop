import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateOrderSchema = z.object({
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELLED'])
})

export default defineEventHandler(async (event) => {
  // Verify authentication
  await verifyAdminAuth(event)

  const orderId = getRouterParam(event, 'id')

  if (!orderId) {
    throw createError({
      statusCode: 400,
      message: 'Order ID is required'
    })
  }

  try {
    const body = await readBody(event)
    const { status } = updateOrderSchema.parse(body)

    // Check if order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!existingOrder) {
      throw createError({
        statusCode: 404,
        message: 'Order not found'
      })
    }

    // Update order status and create history entry
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Update order
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status }
      })

      // Create status history entry
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          status
        }
      })

      // Return order with relations
      return tx.order.findUnique({
        where: { id: order.id },
        include: {
          items: {
            include: {
              product: true
            }
          },
          statusHistory: {
            orderBy: {
              createdAt: 'desc'
            }
          }
        }
      })
    })

    return updatedOrder
  } catch (error: any) {
    if (error.statusCode) throw error
    
    if (error.name === 'ZodError') {
      throw createError({
        statusCode: 400,
        message: 'Invalid status value'
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Error updating order'
    })
  }
})
