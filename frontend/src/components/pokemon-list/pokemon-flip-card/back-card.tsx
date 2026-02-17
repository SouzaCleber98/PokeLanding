'use client';

import { useContext } from 'react';
import { CardContent } from '../../ui/card';
import FlipCardContext from './context/flip-card-context';
import { cn } from '@/lib/utils';

export default function BackCard() {
  const { pokemonData, isFlipped } = useContext(FlipCardContext)!;

  const stats = [
    { label: 'Altura', value: `${(pokemonData.height / 10).toFixed(1)} m` },
    { label: 'Peso', value: `${(pokemonData.weight / 10).toFixed(1)} kg` },
  ];

  return (
    <div
      className={cn(
        'w-full h-2/5 absolute bg-white/95 bottom-0 rounded-t-3xl rotate-y-180',

        !isFlipped && 'backface-hidden'
      )}
    >
      <CardContent className='flex flex-col gap-2  my-10'>
        {stats.map((stat) => (
          <div key={stat.label} className='flex justify-between items-center'>
            <span className='text-[10px] font-semibold uppercase text-gray-400'>
              {stat.label}
            </span>
            <span className='text-xs font-bold text-gray-700'>
              {stat.value}
            </span>
          </div>
        ))}
      </CardContent>
    </div>
  );
}
