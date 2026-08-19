import Pagination from '../../ui/pagination/pagination';
import PokemonCardContainer from './pokemon-flip-card/pokemon-card-container';
import { Generation, NamedApiResource } from '@/lib/api/poke-api/types/types';
import FilterPanel from '../../ui/filter-panel';
import { Suspense } from 'react';
import CardSkeleton from './pokemon-flip-card/card-skeleton';

type PokemonListProps = {
  pokemonData: NamedApiResource[];
  generationList: NamedApiResource[];
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
  const showedList = pokemonData.slice(
    currentPageParam * limit - limit,
    currentPageParam * limit
  );

  return (
    <div className='flex flex-col my-5'>
      <FilterPanel
        generationList={generationList}
        generationParam={generationParam}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center py-8 px-4'>
        {showedList.map((pokemon) => (
          <Suspense key={pokemon.name} fallback={<CardSkeleton />}>
            <PokemonCardContainer pokemonName={pokemon.name} />
          </Suspense>
        ))}
      </div>

      <Pagination
        items={pokemonData.length}
        itemsPerPageLimit={limit}
        currentPageParam={currentPageParam}
      />
    </div>
  );
}
