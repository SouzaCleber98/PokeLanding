'use client';

import TypeIcon from '@/components/ui/type-icon';
import { getPokemonByNameOrId } from '@/lib/api/poke-api/api';
import { PokemonEntity, TypeName } from '@/lib/api/poke-api/types/types';
import { generateEvolutionDescription } from '@/services/pokemon';
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
  const evolutionDescriptions = generateEvolutionDescription(pokemon);

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
          className='flex min-w-22 max-w-22 max-h-60 sm:max-w-30 sm:min-w-30 md:max-w-40 md:min-w-40 md:max-h-100 flex-col flex-1 items-center justify-center gap-1 rounded-xl bg-white/10 border-white/20 p-3 shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer'
        >
          <Link href={`/pokedex/${pokemonData?.id}`}>
            {evolutionDescriptions.length > 0 && (
              <p className='text-[9px] md:text-xs text-center text-white/80 font-medium tracking-wide'>
                (
                {evolutionDescriptions.map((item, index) =>
                  index < evolutionDescriptions.length - 1 ? (
                    <span key={index} className='capitalize'>
                      {item},{' '}
                    </span>
                  ) : (
                    <span key={index} className='capitalize'>
                      {item}
                    </span>
                  )
                )}
                )
              </p>
            )}

            <div className='w-15 h-15 md:w-30 md:h-30 relative'>
              <Image
                src={pokemonData?.sprites.front_default}
                alt={pokemonData?.name}
                fill
                className='object-contain'
              />
            </div>

            <div className='text-center mb-2'>
              <span className='text-[10px] md:text-xs text-white/80'>
                #{String(pokemonData.id).padStart(4, '0')}
              </span>
              <p className='capitalize text-sm md:text-base font-semibold text-white/90'>
                {pokemon.species_name}
              </p>
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
        <div className='flex flex-col gap-3 flex-5 sm:ml-20 md:ml-40'>
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
