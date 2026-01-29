import { d as defineEventHandler, r as readBody, c as createError, s as setCookie, b as useRuntimeConfig } from '../../../_/nitro.mjs';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
const login_post = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { username, password } = body;
  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: "Username and password are required"
    });
  }
  try {
    const admin = await prisma.admin.findUnique({
      where: { username }
    });
    if (!admin || !admin.isActive) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials"
      });
    }
    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: "Invalid credentials"
      });
    }
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: /* @__PURE__ */ new Date() }
    });
    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
        email: admin.email
      },
      config.jwtSecret,
      { expiresIn: "24h" }
    );
    setCookie(event, "admin_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24
      // 24 hours
    });
    return {
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        fullName: admin.fullName
      }
    };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({
      statusCode: 500,
      message: "Error during login"
    });
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
