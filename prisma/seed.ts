import { PrismaClient, Prisma } from '../src/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
  adapter,
});
const userData: Prisma.UserCreateInput[] = [{}];
export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}
main();
