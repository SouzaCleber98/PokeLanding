'use client';

import { PokemonEntity } from '@/lib/api/poke-api/types/types';
import { createContext } from 'react';

export type PokemonDataContextType = {
  pokemonData: PokemonEntity;
  gradientsColor: React.CSSProperties;
};

const PokemonDataContext = createContext<PokemonDataContextType | undefined>(
  undefined
);

export default PokemonDataContext;
