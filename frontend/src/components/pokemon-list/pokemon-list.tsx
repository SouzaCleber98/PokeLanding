'use client';

import { useEffect, useState } from 'react';
import Pagination from '../ui/pagination/pagination';
import PokemonCardContainer from './pokemon-flip-card/pokemon-card-container';
import { getPokemonList } from '@/lib/api/poke-api/api';
import { PokeApiListResponse } from '@/lib/api/poke-api/types';

type pokemonListProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

const limit = 5;

export default function PokemonList() {
  const [pokemonList, setPokemonList] = useState<PokeApiListResponse>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setPokemonList(await getPokemonList(limit, (currentPage - 1) * limit));
    };
    fetchData();
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
        items={40}
        itemsPerPageLimit={limit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
