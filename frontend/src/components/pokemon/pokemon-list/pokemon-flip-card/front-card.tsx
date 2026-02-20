'use client';

import { CardContent } from '../../../ui/card';

import TypeIcon from '../../../ui/type-icon';
import { useContext } from 'react';
import FlipCardContext from './context/flip-card-context';
import { cn } from '@/lib/utils';
import { POKEMON_TYPES_CONSTANTS } from '@/constants/type.constants';

export default function FrontCard({}) {
  const { pokemonData, isFlipped } = useContext(FlipCardContext)!;

  return (
    <div
      className={cn(
        'flex flex-col w-full h-2/5 absolute bg-white  rounded-t-2xl bottom-0 justify-center items-center',
        isFlipped && 'backface-hidden rotate-y-180'
      )}
    >
      <CardContent className='flex gap-1'>
        {pokemonData.types.map(({ type: { name: typeName } }) => (
          <div key={typeName} className='flex-1'>
            <TypeIcon type={typeName} size='sm' />
          </div>
        ))}
      </CardContent>
    </div>
  );
}
