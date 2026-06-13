import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../ui/navbar';
import { Avatar, AvatarFallback } from '../ui/avatar';
import LogoutButton from './logout-button';
import { logOut } from '@/actions/auth';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/utils/get-current-user';

const handleLogout = async () => {
  'use server';
  await logOut();
  redirect('/');
};

export default async function Header() {
  const user = await getCurrentUser();

  const avatarLabel = user?.username || 'Poké';
  const avatarInitial = avatarLabel.trim().charAt(0).toUpperCase() || '?';

  return (
    <header className='flex sticky top-0 justify-between p-3 md:px-10 bg-yellow-300 shadow-sm border-b-2 border-b-yellow-400 z-1'>
      <Link className='flex gap-2 items-center' href='/'>
        <Image
          src='/images/logo.png'
          alt='logo'
          width={60}
          height={60}
          className='ease-in duration-300 hover:rotate-360 hover:scale-110 '
        />

        <p className='text-2xl sm:text-3xl md:text-4xl font-extrabold '>
          Poké<span className='text-red-600'>Landing</span>
        </p>
      </Link>

      <div className='flex items-center gap-3'>
        {user && ( //TODO: arrumar no mobile
          <div className='flex items-center gap-2 rounded-full border border-yellow-400/70 bg-white/55 px-2 py-1 shadow-sm'>
            <Avatar className='border border-white/80 shadow-sm'>
              <AvatarFallback className='bg-red-600 text-white font-bold'>
                {avatarInitial}
              </AvatarFallback>
            </Avatar>

            <div className='hidden sm:block leading-tight'>
              <p className='text-sm font-semibold text-gray-800'>
                {avatarLabel}
              </p>
              <p className='text-xs text-gray-600'>Conectado</p>
            </div>

            <LogoutButton handleLogoutAction={handleLogout} />
          </div>
        )}

        <Navbar user={user} />
      </div>
    </header>
  );
}
