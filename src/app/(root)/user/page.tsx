import UserInfoSection from '@/components/user-info-section/user-info-section';
import { getUserFromSession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { unauthorized } from 'next/navigation';

export default async function UserPage() {
  // TODO: Implement the user page to display user information and allow updates or deletion of the user account.
  const session = await getUserFromSession(await cookies());

  if (!session) unauthorized();

  const { username, email } = session;
  return <UserInfoSection username={username} email={email} />;
}
