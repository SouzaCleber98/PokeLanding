import { getCurrentUser } from '@/lib/auth/utils/get-current-user';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (user) redirect('/');

  return (
    <>
      <section className='w-screen h-screen flex flex-col justify-center items-center'>
        {children}
      </section>
    </>
  );
}
