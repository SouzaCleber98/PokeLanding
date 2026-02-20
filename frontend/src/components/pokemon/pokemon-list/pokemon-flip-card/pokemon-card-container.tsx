'use client';

import { getPokemonByNameOrId } from '@/lib/api/poke-api/api';
import PokemonDataProvider from '../../../../context/pokemon-data-context/pokemon-data-provider';
import PokemonFlipCard from './pokemon-flip-card';
import { useEffect, useState } from 'react';
import { PokemonEntity } from '@/lib/api/poke-api/types';

type PokemonCardContainerProp = {
  pokemonName: string;
};

export default function PokemonCardContainer({
  pokemonName,
}: PokemonCardContainerProp) {
  const [pokemonData, setPokemonData] = useState<PokemonEntity>();

  useEffect(() => {
    const fetchData = async () => {
      setPokemonData(await getPokemonByNameOrId(pokemonName));
    };
    fetchData();
  }, []);

  if (!pokemonData) {
    return <div>Carregando...</div>;
  }

  return (
    <PokemonDataProvider pokemonData={pokemonData}>
      <PokemonFlipCard />
    </PokemonDataProvider>
  );
}
