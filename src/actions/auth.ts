'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { signInSchema, signUpSchema } from '../lib/schemas/index';
import {
  comparePassword,
  generateSalt,
  hashPassword,
} from '@/lib/auth/password-hasher';
import { createSession, removeUserSession } from '@/lib/auth/session';
import { cookies } from 'next/headers';

export async function signIn(unsafeData: z.infer<typeof signInSchema>) {
  const { data, success, error } = signInSchema.safeParse(unsafeData);

  if (!success)
    return {
      success: false,
      error: z.treeifyError(error).errors,
      status: 400,
      message: 'Invalid data',
    };

  const { email, password } = data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user)
      return {
        success: false,
        status: 401,
        message: 'Invalid user or password',
      };

    const isPasswordValid = await comparePassword({
      password,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isPasswordValid)
      return {
        success: false,
        status: 401,
        message: 'Invalid user or password',
      };

    await createSession(await cookies(), user);

    return {
      success: true,
      status: 200,
      message: 'User signed in successfully',
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: 'An error occurred while signing in',
    };
  }
}

export async function signUp(unsafeData: z.infer<typeof signUpSchema>) {
  const { data, success, error } = signUpSchema.safeParse(unsafeData);

  if (!success)
    return {
      success: false,
      error: z.treeifyError(error).errors,
      status: 400,
      message: 'Invalid data',
    };

  const { email, password, username } = data;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      omit: {
        salt: true,
        password: true,
      },
    });

    if (existingUser)
      return {
        success: false,
        status: 409,
        message: 'User with this email already exists',
      };

    const salt = generateSalt();
    const hashedPassword = await hashPassword(password, salt);
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        salt,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    await createSession(await cookies(), user);

    return {
      success: true,
      status: 201,
      message: 'User signed up successfully',
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: 'An error occurred while signing up',
    };
  }
}

export async function logOut() {
  await removeUserSession(await cookies());
}
