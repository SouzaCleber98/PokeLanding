'use server';

import { z } from 'zod';
import { updateUserSchema } from '@/lib/schemas';
import { getUserFromSession, updateUserSession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { unauthorized } from 'next/navigation';
import prisma from '@/lib/prisma';
import { generateSalt, hashPassword } from '@/lib/auth/password-hasher';

export async function updateUser(unsafeData: z.infer<typeof updateUserSchema>) {
  const session = await getUserFromSession(await cookies());

  if (!session) unauthorized();

  const { data, success, error } = updateUserSchema.safeParse(unsafeData);

  if (!success)
    return {
      success: false,
      error: z.treeifyError(error).errors,
      status: 400,
      message: 'Invalid data',
    };

  const { username, password, email } = data;
  let salt;
  let hashedPassword;
  if (password) {
    salt = generateSalt();
    hashedPassword = await hashPassword(password, salt);
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.id },
      data: {
        username,
        password: hashedPassword,
        email,
        salt: salt,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    await updateUserSession(await cookies(), user);

    return {
      success: true,
      status: 201,
      message: 'User updated successfully',
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      status: 500,
      message: 'An error occurred while updating the user',
    };
  }
}
export async function deleteUser() {
  // TODO: Implement the deleteUser function to handle deleting a user from the database.
}
