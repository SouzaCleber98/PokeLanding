'use server';

import { redirect } from 'next/navigation';
import { logOut } from '../auth';

export async function handleLogout() {
  await logOut();
  redirect('/');
}
