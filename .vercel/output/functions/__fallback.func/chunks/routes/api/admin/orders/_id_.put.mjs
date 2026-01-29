import { d as defineEventHandler, v as verifyAdminAuth, a as getRouterParam, c as createError, r as readBody } from '../../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import 'node:crypto';

const prisma = new PrismaClient();
const updateOrderSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"])
});
const _id__put = defineEventHandler(async (event) => {
  await verifyAdminAuth(event);
  const orderId = getRouterParam(event, "id");
  if (!orderId) {
    throw createError({
      statusCode: 400,
      message: "Order ID is required"
    });
  }
  try {
    const body = await readBody(event);
    const { status } = updateOrderSchema.parse(body);
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId }
    });
    if (!existingOrder) {
      throw createError({
        statusCode: 404,
        message: "Order not found"
      });
    }
    const updatedOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status }
      });
      await tx.orderStatusHistory.create({
        data: {
          orderId: order.id,
          status
        }
      });
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
              createdAt: "desc"
            }
          }
        }
      });
    });
    return updatedOrder;
  } catch (error) {
    if (error.statusCode) throw error;
    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        message: "Invalid status value"
      });
    }
    throw createError({
      statusCode: 500,
      message: "Error updating order"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
