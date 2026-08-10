import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const signUpSchema = z
  .object({
    username: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateUserSchema = z
  .object({
    username: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.string().min(3, 'Name must be at least 3 characters long').optional()
    ),
    email: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z.email().optional()
    ),
    password: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .optional()
    ),
    confirmPassword: z.preprocess(
      (value) => (value === '' ? undefined : value),
      z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .optional()
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Passwords do not match',
    path: ['confirmPassword'],
  });
