'use client';

import TypeIcon from '@/components/ui/type-icon';
import { getPokemonByNameOrId } from '@/lib/api/poke-api/api';
import { PokemonEntity, TypeName } from '@/lib/api/poke-api/types/types';
import { PokemonEvolution } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Xarrow, { useXarrow } from 'react-xarrows';

type PokemonEvolutionChartProps = {
  pokemon: PokemonEvolution;
  evolutionList: PokemonEvolution[];
};

export default function PokemonEvolutionChart({
  pokemon,
  evolutionList,
}: PokemonEvolutionChartProps) {
  const updateXarrow = useXarrow();
  const [pokemonData, setPokemonData] = useState<PokemonEntity | null>(null);
  const newEvolutionList = evolutionList.filter(
    (item) => item.species_name !== pokemon.species_name
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPokemonByNameOrId(pokemon.species_name);
        setPokemonData(response);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateXarrow();
  }, [pokemonData]);

  if (!pokemonData) {
    return null;
  }

  return (
    <>
      <div>
        <div
          id={pokemon.species_name}
          className='flex w-fit h-fit max-w-30 max-h-50 md:max-w-100 md:max-h-100 flex-col flex-1 items-center justify-center gap-1 rounded-xl bg-white/10 border-white/20 p-3 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer min-w-[90px]'
        >
          <Link href={`/pokedex/${pokemonData?.id}`}>
            <div className='w-15 h-15 md:w-30  md:h-30 relative'>
              <Image
                src={pokemonData?.sprites.front_default}
                alt={pokemonData?.name}
                fill
              />
            </div>

            <div className='text-center mb-2'>
              <span className='text-xs'>
                #{String(pokemonData.id).padStart(4, '0')}
              </span>
              <p className='capitalize '>{pokemon.species_name}</p>
            </div>

            <div className='flex flex-col items-center gap-1'>
              {pokemonData.types.map((type) => (
                <TypeIcon
                  key={type.type.name}
                  type={type.type.name as TypeName}
                  size='xs'
                />
              ))}
            </div>
          </Link>
        </div>

        {pokemon.evolve_from && (
          <Xarrow
            path='grid'
            startAnchor={['bottom', 'right']}
            endAnchor={['left', 'right']}
            strokeWidth={2}
            headSize={4}
            tailSize={2}
            color='grey'
            start={pokemon.evolve_from}
            end={pokemon.species_name}
          />
        )}
      </div>

      {pokemon.evolves_to && pokemon.evolves_to.length >= 2 ? (
        <div className='flex flex-col gap-3 flex-5'>
          {evolutionList.map(
            (item) =>
              item.evolve_from === pokemonData.name && (
                <PokemonEvolutionChart
                  key={item.species_name}
                  pokemon={item}
                  evolutionList={newEvolutionList}
                />
              )
          )}
        </div>
      ) : (
        <>
          {evolutionList.map(
            (item) =>
              item.evolve_from === pokemonData.name && (
                <PokemonEvolutionChart
                  key={item.species_name}
                  pokemon={item}
                  evolutionList={newEvolutionList}
                />
              )
          )}
        </>
      )}
    </>
  );
}
