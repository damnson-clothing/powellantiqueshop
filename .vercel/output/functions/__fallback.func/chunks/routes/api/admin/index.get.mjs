import { d as defineEventHandler, v as verifyAdminAuth, c as createError } from '../../../_/nitro.mjs';
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
const index_get = defineEventHandler(async (event) => {
  await verifyAdminAuth(event);
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return orders;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching orders"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
