'use server';

import { redirect } from 'next/navigation';
import { logOut } from '../auth';
import { deleteUser } from '../user';

export async function handleLogout() {
  await logOut();
  redirect('/');
}

export async function handleDelete() {
  await deleteUser();
  redirect('/');
}
