'use client';

import { ReactNode } from 'react';
import PokemonDataContext, {
  PokemonDataContextType,
} from './pokemon-data-context';
import { PokemonEntity } from '@/lib/api/poke-api/types';
import generateGradient from '@/utils/generate-gradients';
import { POKEMON_TYPES_CONSTANTS } from '@/constants/type.constants';

type PokemonDataProviderProps = {
  pokemonData: PokemonEntity;
  gradientAngle?: number;
  children: ReactNode;
};

export default function PokemonDataProvider({
  children,
  gradientAngle = 90,
  pokemonData,
}: PokemonDataProviderProps) {
  const colors = pokemonData.types.map(
    ({ type: { name } }) => POKEMON_TYPES_CONSTANTS[name].color
  );

  const gradientsColor = generateGradient(colors, gradientAngle);

  const value: PokemonDataContextType = {
    pokemonData,
    gradientsColor,
  };

  return (
    <PokemonDataContext.Provider value={value}>
      {children}
    </PokemonDataContext.Provider>
  );
}
