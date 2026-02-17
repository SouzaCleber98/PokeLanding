import { getPokemonByNameOrId } from '@/lib/api/poke-api/api';

import FlipCardProvider from './context/flip-card-provider';
import PokemonFlipCard from './pokemon-flip-card';

type PokemonCardContainerProp = {
  pokemonName: string;
};

export default async function PokemonCardContainer({
  pokemonName,
}: PokemonCardContainerProp) {
  const pokemonData = await getPokemonByNameOrId(pokemonName);

  pokemonData.types[0].type;
  return (
    <FlipCardProvider pokemonData={pokemonData}>
      <PokemonFlipCard />
    </FlipCardProvider>
  );
}
