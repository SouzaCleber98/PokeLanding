import Link from 'next/link';
import { Avatar, AvatarFallback } from '../avatar';
import LogoutButton from './logout-button';

type UserInfoProps = {
  avatarLabel: string;
  avatarInitial: string;
};

export default function UserAvatarInfo({
  avatarLabel,
  avatarInitial,
}: UserInfoProps) {
  return (
    <Link
      className='flex items-center gap-2 rounded-full border border-yellow-400/70 bg-white/55 px-2 py-1 shadow-sm
    '
      href='/user'
    >
      <Avatar className='border border-white/80 shadow-sm'>
        <AvatarFallback className='bg-red-600 text-white font-bold'>
          {avatarInitial}
        </AvatarFallback>
      </Avatar>

      <div className='hidden sm:block leading-tight'>
        <p className='text-sm font-semibold text-gray-800'>{avatarLabel}</p>
        <p className='text-xs text-gray-600'>Conectado</p>
      </div>

      <LogoutButton />
    </Link>
  );
}
