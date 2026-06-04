import crypto from 'crypto';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import z from 'zod';
import redis from '@/lib/redis';

export const sessionSchema = z.object({
  id: z.string(),
  username: z.string(),
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

  await redis.set(
    `session:${sessionId}`,
    JSON.stringify(data),
    'EX',
    SESSION_EXPIRATION_TIME / 1000
  );

  await setCookies(cookies, sessionId);
}

export async function removeUserSession(cookies: ReadonlyRequestCookies) {
  const sessionId = cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) return null;

  await redis.del(`session:${sessionId}`);
  cookies.delete(SESSION_COOKIE_NAME);
}

export async function getUserSessionById(sessionId: string) {
  const rawData = await redis.get(`session:${sessionId}`);

  if (!rawData) return null;

  const parsedData = JSON.parse(rawData);
  const { data, success } = sessionSchema.safeParse(parsedData);

  if (!success) return null;

  return data;
}

async function getUserFromSession(cookies: ReadonlyRequestCookies) {
  const sessionId = cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionId) return null;

  return getUserSessionById(sessionId);
}
