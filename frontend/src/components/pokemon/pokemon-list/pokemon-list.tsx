'use client';

import { useEffect, useState } from 'react';
import Pagination from '../../ui/pagination/pagination';
import PokemonCardContainer from './pokemon-flip-card/pokemon-card-container';
import { Generation, NamedApiResource } from '@/lib/api/poke-api/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import FilterPanel from '../../ui/filter-panel';
import { POKEMONSBYGENERATION } from '@/constants';

type PokemonListProps = {
  pokemonData: NamedApiResource[];
  generationList: NamedApiResource[];
  limit: number;
};

export default function PokemonList({
  pokemonData,
  generationList,
  limit,
}: PokemonListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [pokemonList, setPokemonList] =
    useState<NamedApiResource[]>(pokemonData);
  const [currentPage, setCurrentPage] = useState(1);
  const [generation, setGeneration] = useState<Generation>(
    (searchParams.get('generation') || 'all') as Generation
  );

  useEffect(() => {
    setPokemonList(pokemonData);
  }, [pokemonData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [generation]);

  useEffect(() => {
    const path: string[] = [];

    if (generation) {
      path.push(`generation=${generation}`);
    }

    if (currentPage) {
      path.push(`currentPage=${currentPage}`);
    }

    router.push(`${pathname}?${path.join('&')}`);
  }, [currentPage, generation]);

  if (!pokemonList || !generationList) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='flex flex-col my-5'>
      <FilterPanel
        generationList={generationList}
        generation={generation}
        setGeneration={setGeneration}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center py-8 px-4'>
        {pokemonList?.map((pokemon) => (
          <PokemonCardContainer key={pokemon.name} pokemonName={pokemon.name} />
        ))}
      </div>

      <Pagination
        items={
          POKEMONSBYGENERATION[generation].end -
          POKEMONSBYGENERATION[generation].start
        }
        itemsPerPageLimit={limit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
