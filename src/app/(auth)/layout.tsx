import Header from '@/components/header/header';
import { getUserFromSession } from '@/lib/auth/session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await getUserFromSession(await cookies());

  if (isLoggedIn) redirect('/');

  return (
    <main>
      <Header />

      <section className='w-screen h-screen flex flex-col justify-center items-center'>
        {children}
      </section>
    </main>
  );
}
