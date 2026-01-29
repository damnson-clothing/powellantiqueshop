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
const _id__delete = defineEventHandler(async (event) => {
  await verifyAdminAuth(event);
  const productId = getRouterParam(event, "id");
  if (!productId) {
    throw createError({
      statusCode: 400,
      message: "Product ID is required"
    });
  }
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId }
    });
    if (!existingProduct) {
      throw createError({
        statusCode: 404,
        message: "Product not found"
      });
    }
    await prisma.product.delete({
      where: { id: productId }
    });
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Error deleting product"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
