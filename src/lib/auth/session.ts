import crypto from 'crypto';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import z from 'zod';
import redis from '@/lib/redis';
import { updateUserSchema } from '../schemas';

export const sessionSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
});

const SESSION_COOKIE_NAME = 'session';
const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 7; // days in milliseconds

async function setCookies(cookies: ReadonlyRequestCookies, sessionId: string) {
  cookies.set(SESSION_COOKIE_NAME, sessionId, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: new Date(Date.now() + SESSION_EXPIRATION_TIME),
  });
}

export async function createSession(
  cookies: ReadonlyRequestCookies,
  unsafeData: z.infer<typeof sessionSchema>
) {
  const { data, success } = sessionSchema.safeParse(unsafeData);

  if (!success) throw new Error('Invalid session data');
  const sessionId: string = crypto.randomUUID();

  try {
    await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      'EX',
      SESSION_EXPIRATION_TIME / 1000
    );
  } catch (e) {
    throw new Error(`Failed to create session on Redis: ${e}`);
  }
  await setCookies(cookies, sessionId);
}

export async function removeUserSession(cookies: ReadonlyRequestCookies) {
  const sessionId = cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) return null;

  await redis.del(`session:${sessionId}`);
  cookies.delete(SESSION_COOKIE_NAME);
}

export async function getUserFromSession(cookies: ReadonlyRequestCookies) {
  try {
    const sessionId = cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!sessionId) return null;

    return await getUserSessionById(sessionId);
  } catch (e) {
    console.error('Error getting user from session:', e);
    return null;
  }
}

async function getUserSessionById(sessionId: string) {
  const rawData = await redis.get(`session:${sessionId}`);

  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);
  const { data, success } = sessionSchema.safeParse(parsedData);

  if (!success) return null;

  return data;
}

export async function updateUserSession(
  cookies: ReadonlyRequestCookies,
  data: z.infer<typeof updateUserSchema>
) {
  const sessionId = cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) throw new Error('No session found');

  const oldData = await redis.get(`session:${sessionId}`);

  if (!oldData) throw new Error('No session found');

  const parsedData = updateUserSchema.parse(JSON.parse(oldData));

  const updatedData = {
    ...parsedData,
    ...data,
  };

  await redis.set(
    `session:${sessionId}`,
    JSON.stringify(updatedData),
    'EX',
    SESSION_EXPIRATION_TIME / 1000
  );
}
