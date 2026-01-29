import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../_/nitro.mjs';
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
const _orderNumber__get = defineEventHandler(async (event) => {
  const orderNumber = getRouterParam(event, "orderNumber");
  if (!orderNumber) {
    throw createError({
      statusCode: 400,
      message: "Order number is required"
    });
  }
  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: {
            product: true
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

export { _orderNumber__get as default };
//# sourceMappingURL=_orderNumber_.get.mjs.map
