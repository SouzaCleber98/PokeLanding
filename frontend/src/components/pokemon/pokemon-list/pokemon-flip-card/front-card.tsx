'use client';

import { CardContent } from '../../../ui/card';

import TypeIcon from '../../../ui/type-icon';
import { useContext } from 'react';
import PokemonDataContext from '../../../../context/pokemon-data-context/pokemon-data-context';
import { cn } from '@/lib/utils';
import { POKEMON_TYPES_CONSTANTS } from '@/constants/type.constants';

type FrontCardProps = {
  isFlipped: boolean;
};

export default function FrontCard({ isFlipped }: FrontCardProps) {
  const { pokemonData } = useContext(PokemonDataContext)!;

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
