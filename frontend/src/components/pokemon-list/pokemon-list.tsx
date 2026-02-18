'use client';

import { useEffect, useState } from 'react';
import Pagination from '../ui/pagination/pagination';
import PokemonCardContainer from './pokemon-flip-card/pokemon-card-container';
import { PokeApiListResponse } from '@/lib/api/poke-api/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type pokemonListProps = {
  pokemonData: PokeApiListResponse;
  limit: number;
};

export default function PokemonList({ pokemonData, limit }: pokemonListProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [pokemonList, setPokemonList] =
    useState<PokeApiListResponse>(pokemonData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setPokemonList(pokemonData);
  }, [pokemonData]);

  useEffect(() => {
    router.push(`${pathname}?currentPage=${currentPage}`);
  }, [currentPage]);

  if (!pokemonList) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='flex flex-col my-5'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 place-items-center py-8 px-4'>
        {pokemonList.results.map((pokemon) => (
          <PokemonCardContainer key={pokemon.name} pokemonName={pokemon.name} />
        ))}
      </div>

      <Pagination
        items={12}
        itemsPerPageLimit={limit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
