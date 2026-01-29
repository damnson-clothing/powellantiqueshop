import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const orderSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(1, 'Phone is required'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive()
  })).min(1, 'At least one item is required'),
  customerNotes: z.string().optional()
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validate request body
    const validatedData = orderSchema.parse(body)

    // Fetch products to calculate total
    const productIds = validatedData.items.map(item => item.productId)
    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isAvailable: true
      }
    })

    if (products.length !== validatedData.items.length) {
      throw createError({
        statusCode: 400,
        message: 'Some products are not available'
      })
    }

    // Calculate totals
    let subtotal = 0
    const orderItems = validatedData.items.map(item => {
      const product = products.find(p => p.id === item.productId)!
      const itemTotal = Number(product.price) * item.quantity
      subtotal += itemTotal

      return {
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        quantity: item.quantity
      }
    })

    const total = subtotal // Add shipping/tax calculation here if needed

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        shippingAddress: validatedData.shippingAddress,
        subtotal,
        total,
        customerNotes: validatedData.customerNotes,
        items: {
          create: orderItems
        },
        statusHistory: {
          create: {
            status: 'PENDING',
            notes: 'Order created'
          }
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return {
      success: true,
      order
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      throw createError({
        statusCode: 400,
        message: error.errors[0].message
      })
    }

    if (error.statusCode) throw error

    throw createError({
      statusCode: 500,
      message: 'Error creating order'
    })
  }
})
