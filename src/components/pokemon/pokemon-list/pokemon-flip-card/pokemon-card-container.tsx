import { getPokemonByNameOrId } from '@/lib/api/poke-api/api';
import PokemonDataProvider from '../../../../context/pokemon-data-context/pokemon-data-provider';
import PokemonFlipCard from './pokemon-flip-card';
import { PokemonEntity } from '@/lib/api/poke-api/types/types';

type PokemonCardContainerProp = {
  pokemonName: string;
};

export default async function PokemonCardContainer({
  pokemonName,
}: PokemonCardContainerProp) {
  const pokemonData = await getPokemonByNameOrId(pokemonName);

  return (
    <PokemonDataProvider pokemonData={pokemonData}>
      <PokemonFlipCard />
    </PokemonDataProvider>
  );
}
