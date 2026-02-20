'use client';

import { PokemonEntity } from '@/lib/api/poke-api/types';
import { createContext } from 'react';

export type FlipCardContextType = {
  pokemonData: PokemonEntity;
  gradientsColor: React.CSSProperties;
  isFlipped: boolean;
  setIsFlipped: (value: boolean) => void;
};

const FlipCardContext = createContext<FlipCardContextType | undefined>(
  undefined
);

export default FlipCardContext;
