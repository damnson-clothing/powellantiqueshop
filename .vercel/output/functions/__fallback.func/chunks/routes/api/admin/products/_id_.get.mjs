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
  const productId = getRouterParam(event, "id");
  if (!productId) {
    throw createError({
      statusCode: 400,
      message: "Product ID is required"
    });
  }
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true
      }
    });
    if (!product) {
      throw createError({
        statusCode: 404,
        message: "Product not found"
      });
    }
    return product;
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Error fetching product"
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
