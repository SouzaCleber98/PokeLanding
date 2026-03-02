import Navbar from '@/components/ui/navbar';
import Link from 'next/link';

export default function PokedexHeader() {
  return (
    <div className='flex justify-between border-2 border-b-0 border-red-800 bg-red-600 px-5 pt-5 pb-4'>
      <div>
        <div className='flex items-center gap-2 '>
          <Link
            href='/'
            className='flex h-12 w-12 items-center justify-center rounded-full border-4 border-sky-600 bg-sky-300'
          >
            <div className='h-5 w-5 rounded-full bg-sky-100 opacity-70' />
          </Link>

          <div className='ml-2 flex items-center gap-2'>
            <span className='h-3 w-3 rounded-full border border-red-400 bg-red-300' />
            <span className='h-3 w-3 rounded-full border border-yellow-400 bg-yellow-300 ' />
            <span className='h-3 w-3 rounded-full border border-green-400 bg-green-400 ' />
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
