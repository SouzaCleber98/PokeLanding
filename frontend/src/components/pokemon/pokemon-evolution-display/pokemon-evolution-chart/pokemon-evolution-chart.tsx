import { getPokemonByNameOrId } from '@/lib/api/poke-api/api';
import { PokemonEntity } from '@/lib/api/poke-api/types/types';
import { PokemonEvolution } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

type PokemonEvolutionChartProps = {
  pokemon: PokemonEvolution;
  evolutionList: PokemonEvolution[];
};

export default async function PokemonEvolutionChart({
  pokemon,
  evolutionList,
}: PokemonEvolutionChartProps) {
  const newEvolutionList = evolutionList.filter(
    (item) => item.species_name !== pokemon.species_name
  );

  let pokemonData: PokemonEntity | null = null;

  try {
    pokemonData = await getPokemonByNameOrId(pokemon.species_name);
  } catch (e) {
    console.error(e);
  }

  if (!pokemonData) {
    return null;
  }
  return (
    <div style={{ marginLeft: 40 }}>
      <Link href={`/pokedex/${pokemonData?.id}`}>
        <Image
          src={pokemonData?.sprites.front_default}
          alt={pokemonData?.name}
          width={20}
          height={20}
        />
      </Link>

      {evolutionList.map(
        (item) =>
          item.envolve_from === pokemonData.name && (
            <PokemonEvolutionChart
              key={item.species_name}
              pokemon={item}
              evolutionList={newEvolutionList}
            />
          )
      )}
    </div>
  );
}
