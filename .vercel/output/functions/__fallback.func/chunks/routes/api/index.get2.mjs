import { d as defineEventHandler, f as getQuery, c as createError } from '../../_/nitro.mjs';
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
  const query = getQuery(event);
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 12;
  const category = query.category;
  const search = query.search;
  const featured = query.featured === "true";
  const minPrice = query.minPrice ? Number(query.minPrice) : void 0;
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : void 0;
  const condition = query.condition;
  const skip = (page - 1) * limit;
  const where = {
    isAvailable: true
  };
  if (category) {
    where.category = {
      slug: category
    };
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ];
  }
  if (featured) {
    where.isFeatured = true;
  }
  if (minPrice !== void 0 || maxPrice !== void 0) {
    where.price = {};
    if (minPrice !== void 0) where.price.gte = minPrice;
    if (maxPrice !== void 0) where.price.lte = maxPrice;
  }
  if (condition) {
    where.condition = condition;
  }
  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc"
        }
      }),
      prisma.product.count({ where })
    ]);
    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error fetching products"
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
