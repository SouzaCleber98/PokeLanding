import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signUpSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });
