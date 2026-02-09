import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from './navbar';

export default function Header() {
  return (
    <header className='flex sticky justify-between p-3 md:px-10 bg-yellow-400 shadow-sm border-b-2 border-b-amber-400 z-1'>
      <Link className='flex gap-2 items-center' href='/'>
        <Image
          src='/images/logo.png'
          alt='logo'
          width={60}
          height={60}
          className='ease-in duration-300 hover:rotate-360 hover:scale-110 '
        />

        <p className='hidden sm:block text-2xl font-extrabold '>
          Poké<span className='text-red-600'>Landing</span>
        </p>
      </Link>

      <Navbar />
    </header>
  );
}
