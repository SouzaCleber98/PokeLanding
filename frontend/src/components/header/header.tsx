import { cn } from '@/lib/utils';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from './navbar';

export default function Header() {
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

      <Navbar />
    </header>
  );
}
