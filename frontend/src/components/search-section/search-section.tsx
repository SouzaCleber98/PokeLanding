import Image from 'next/image';
import SearchInput from './search-input';

export default function SearchSection() {
  return (
    <section className='relative overflow-hidden py-12 px-4 bg-red-600'>
      <div className='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5'>
        <Image
          src='/images/pokeball.png'
          alt='pokeball'
          width={400}
          height={400}
          aria-hidden
        />
      </div>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-extrabold tracking-tight text-white sm:text-4xl'>
          Encontre seu Pokémon
        </h1>
        <div className='w-full mt-4'>
          <SearchInput />
        </div>
      </div>
    </section>
  );
}
