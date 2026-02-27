'use client';

import { Generation, NamedApiResource } from '@/lib/api/poke-api/types/types';
import { Button } from './button';
import { cn } from '@/lib/utils';

type FilterPanelProps = {
  generationList: NamedApiResource[];
  generation: string;
  setGeneration: (value: Generation) => void;
};

const filterButtonBase = cn(
  'rounded-full border-2 border-red-500 bg-white text-red-600',
  'hover:bg-red-500 hover:text-white',
  'duration-300 capitalize'
);

const filterButtonActive = cn(
  'bg-red-600 text-white border-red-700 hover:bg-red-700'
);

export default function FilterPanel({
  generationList,
  generation,
  setGeneration,
}: FilterPanelProps) {
  return (
    <nav className='flex flex-wrap justify-center gap-2 py-4 px-2'>
      <Button
        size='sm'
        className={cn(
          filterButtonBase,
          generation === 'all' && filterButtonActive
        )}
        onClick={() => setGeneration('all')}
      >
        All
      </Button>

      {generationList?.map(({ name }) => (
        <Button
          key={name}
          size='sm'
          className={cn(
            filterButtonBase,
            generation === name && filterButtonActive
          )}
          onClick={() => setGeneration(name as Generation)}
        >
          {`${name.slice(0, 10)} ${name.slice(11).toUpperCase()}`}
        </Button>
      ))}
    </nav>
  );
}
