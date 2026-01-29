import { d as defineEventHandler, v as verifyAdminAuth, a as getRouterParam, c as createError } from '../../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
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
const _id__get = defineEventHandler(async (event) => {
  await verifyAdminAuth(event);
  const orderId = getRouterParam(event, "id");
  if (!orderId) {
    throw createError({
      statusCode: 400,
      message: "Order ID is required"
    });
  }
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
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
    if (!order) {
      throw createError({
        statusCode: 404,
        message: "Order not found"
      });
    }
    return order;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Error fetching order"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
