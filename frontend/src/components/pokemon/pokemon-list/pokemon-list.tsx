'use client';

import { useEffect, useState } from 'react';
import Pagination from '../../ui/pagination/pagination';
import PokemonCardContainer from './pokemon-flip-card/pokemon-card-container';
import { Generation, NamedApiResource } from '@/lib/api/poke-api/types/types';
import FilterPanel from '../../ui/filter-panel';
import { POKEMONSBYGENERATION } from '@/constants';

type PokemonListProps = {
  pokemonData: NamedApiResource[];
  generationList: NamedApiResource[];
  search: string | undefined;
  currentPageParam: number | undefined;
  generationParam: Generation | undefined;
  limit: number;
};

export default function PokemonList({
  pokemonData,
  generationList,
  currentPageParam = 1,
  generationParam = 'all',
  limit,
}: PokemonListProps) {
  const [pokemonList, setPokemonList] =
    useState<NamedApiResource[]>(pokemonData);

  useEffect(() => {
    setPokemonList(pokemonData);
  }, [pokemonData]);

  if (!pokemonList || !generationList) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='flex flex-col my-5'>
      <FilterPanel
        generationList={generationList}
        generationParam={generationParam}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center py-8 px-4'>
        {pokemonList?.map((pokemon) => (
          <PokemonCardContainer key={pokemon.name} pokemonName={pokemon.name} />
        ))}
      </div>

      <Pagination
        items={
          POKEMONSBYGENERATION[generationParam as Generation].end -
          POKEMONSBYGENERATION[generationParam as Generation].start
        }
        itemsPerPageLimit={limit}
        currentPageParam={currentPageParam}
      />
    </div>
  );
}
