import { d as defineEventHandler, c as createError } from '../../_/nitro.mjs';
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
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc"
      }
    });
    return categories;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching categories"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
