import { generateSalt, hashPassword } from '@/lib/auth/password-hasher';
import { Prisma } from '../src/app/generated/prisma/client';
import prisma from '@/lib/prisma';
import 'dotenv/config';

const sampleData = {
  username: 'testuser',
  email: 'test@test.com',
  password: 'password123',
  salt: generateSalt(),
};

async function seed() {
  const userData: Prisma.UserCreateInput[] = [
    {
      email: sampleData.email,
      username: sampleData.username,
      salt: sampleData.salt,
      password: await hashPassword(sampleData.password, sampleData.salt),
    },
  ];

  return userData;
}

export async function main() {
  try {
    const users = await seed();
    for (const u of users) {
      await prisma.user.create({ data: u });
    }
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
