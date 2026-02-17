'use client';

import { useContext } from 'react';
import FlipCardContext from './context/flip-card-context';
import FrontCard from './front-card';
import BackCard from './back-card';
import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function PokemonFlipCard() {
  const { isFlipped, setIsFlipped, gradientsColor, pokemonData } =
    useContext(FlipCardContext)!;

  return (
    <Card
      className={cn(
        'w-48 h-72 overflow-hidden relative border-0 select-none',
        'duration-500 transform-3d perspective-[1000px]',
        'hover:shadow-2xl hover:ring-1',
        isFlipped && 'rotate-y-180'
      )}
      style={gradientsColor}
    >
      {!isFlipped && (
        <CardHeader className='px-2 sm:px-3 gap-0'>
          <CardDescription className='text-white/70 text-xs sm:text-sm font-bold tracking-wider'>
            #{String(pokemonData.id).padStart(4, '0')}
          </CardDescription>
          <CardTitle className='text-white text-sm md:text-lg capitalize font-bold drop-shadow-md'>
            {pokemonData.name}
          </CardTitle>
        </CardHeader>
      )}

      <div className='w-full h-20 absolute top-1/4 drop-shadow-lg'>
        <Image
          src={cn(
            !isFlipped
              ? pokemonData.sprites.other?.showdown.front_default!
              : pokemonData.sprites.other?.showdown.back_default!
          )}
          alt={pokemonData.name}
          className='z-10 object-contain drop-shadow-md'
          fill
        />
      </div>

      <CardAction className='absolute top-2 right-2 z-10'>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full hover:bg-white/30 text-white/80 hover:text-white transition-colors size-7'
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <FontAwesomeIcon icon={faRotateRight} className='text-xs' />
        </Button>
      </CardAction>

      <FrontCard />
      <BackCard />
    </Card>
  );
}
