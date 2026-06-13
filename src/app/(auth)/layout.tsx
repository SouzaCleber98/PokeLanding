import Header from '@/components/header/header';
import { getCurrentUser } from '@/lib/auth/utils/get-current-user';
import { redirect } from 'next/navigation';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) redirect('/');

  return (
    <main>
      <Header />
      <section className='w-screen h-screen flex flex-col justify-center items-center'>
        {children}
      </section>
    </main>
  );
}
