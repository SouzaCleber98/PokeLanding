import PokemonEvolutionDisplay from '@/components/pokemon/pokemon-evolution-display/pokemon-evolution-display';
import {
  getEvolutionChainById,
  getPokemonByNameOrId,
  getPokemonSpeciesByNameOrId,
} from '@/lib/api/poke-api/api';
import {
  EvolutionData,
  PokemonEntity,
  SpeciesInformation,
} from '@/lib/api/poke-api/types/types';

export default async function PokemonEvolutionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let pokemonData: PokemonEntity | null = null;
  let speciesInfo: SpeciesInformation | null = null;
  let pokemonEvolutionChain: EvolutionData | null = null;

  try {
    pokemonData = await getPokemonByNameOrId(id);
    speciesInfo = await getPokemonSpeciesByNameOrId(
      pokemonData?.species.name ?? id
    );
    pokemonEvolutionChain = await getEvolutionChainById(
      Number(speciesInfo?.evolution_chain.url.split('/').reverse()[1])
    );
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <PokemonEvolutionDisplay evolutionData={pokemonEvolutionChain!} />
    </>
  );
}
