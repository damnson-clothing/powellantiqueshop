import { d as defineEventHandler, v as verifyAdminAuth, r as readBody, c as createError } from '../../../_/nitro.mjs';
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
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  categoryId: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  material: z.string().optional(),
  history: z.string().optional(),
  images: z.array(z.string()).default([]),
  isAvailable: z.boolean().default(true),
  isFeatured: z.boolean().default(false)
});
const index_post = defineEventHandler(async (event) => {
  await verifyAdminAuth(event);
  try {
    const body = await readBody(event);
    const validatedData = productSchema.parse(body);
    const slug = validatedData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });
    if (existingProduct) {
      throw createError({
        statusCode: 400,
        message: "A product with this name already exists"
      });
    }
    const product = await prisma.product.create({
      data: {
        ...validatedData,
        slug
      },
      include: {
        category: true
      }
    });
    return product;
  } catch (error) {
    if (error.statusCode) throw error;
    if (error.name === "ZodError") {
      throw createError({
        statusCode: 400,
        message: error.errors[0].message
      });
    }
    throw createError({
      statusCode: 500,
      message: "Error creating product"
    });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
