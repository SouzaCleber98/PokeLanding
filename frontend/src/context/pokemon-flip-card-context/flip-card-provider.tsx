'use client';

import { ReactNode, useState } from 'react';
import FlipCardContext, { FlipCardContextType } from './flip-card-context';
import { PokemonEntity } from '@/lib/api/poke-api/types';
import generateGradient from '@/utils/generate-gradients';
import { POKEMON_TYPES_CONSTANTS } from '@/constants/type.constants';

type FlipCardProviderProps = {
  pokemonData: PokemonEntity;
  gradientAngle?: number;
  children: ReactNode;
};

export default function FlipCardProvider({
  children,
  gradientAngle = 90,
  pokemonData,
}: FlipCardProviderProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const colors = pokemonData.types.map(
    ({ type: { name } }) => POKEMON_TYPES_CONSTANTS[name].color
  );

  const gradientsColor = generateGradient(colors, gradientAngle);

  const value: FlipCardContextType = {
    pokemonData,
    gradientsColor,
    isFlipped,
    setIsFlipped,
  };

  return (
    <FlipCardContext.Provider value={value}>
      {children}
    </FlipCardContext.Provider>
  );
}
