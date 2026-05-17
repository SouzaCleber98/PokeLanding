import {
  EvolutionData,
  SpeciesInformation,
} from '@/lib/api/poke-api/types/types';
import { mapEvolution } from '@/services/pokemon';
import { getPokemonSpeciesByNameOrId } from '@/lib/api/poke-api/api';
import PokemonEvolutionContainer from './pokemon-evolution-chart/pokemon-evolution-container';

export default async function PokemonEvolutionDisplay({
  evolutionData,
}: {
  evolutionData: EvolutionData;
}) {
  const pokemonEvolutionList = mapEvolution(evolutionData);
  let mappedEvolutionHierarchy = await Promise.all(
    pokemonEvolutionList.map(async (item) => {
      let speciesInfo: SpeciesInformation | null = null;

      try {
        speciesInfo = await getPokemonSpeciesByNameOrId(item.species_name);
      } catch (e) {
        console.error(e);
      }
      if (!speciesInfo?.evolves_from_species) return { ...item };

      return { evolve_from: speciesInfo.evolves_from_species.name, ...item };
    })
  );

  mappedEvolutionHierarchy = mappedEvolutionHierarchy.map((item, _, array) => {
    const children = array.filter(
      (child) => child.evolve_from === item.species_name
    );
    return {
      ...item,
      evolves_to: [...children.map((child) => child.species_name)],
    };
  });

  const baseEvolution = mappedEvolutionHierarchy.find(
    (item) => !item.evolve_from
  );
  mappedEvolutionHierarchy = mappedEvolutionHierarchy.filter(
    (item) => item.species_name !== baseEvolution?.species_name
  );
  console.log(baseEvolution);
  console.log(mappedEvolutionHierarchy);
  return (
    <div className='flex flex-col justify-center items-center bg-gray-800/25 gap-2 p-3 rounded-4xl'>
      <h3 className='font-bold text-white capitalize mb-2'>evolution </h3>
      {mappedEvolutionHierarchy.length > 0 ? (
        <PokemonEvolutionContainer
          firstEvolution={baseEvolution!}
          evolutionList={mappedEvolutionHierarchy}
        />
      ) : (
        <p className='text-base text-center md:text-2xl text-white/60'>
          Esse Pokemón não tem evolução
        </p>
      )}
    </div>
  );
}
