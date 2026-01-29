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
const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({
      statusCode: 400,
      message: "Product slug is required"
    });
  }
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
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

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
