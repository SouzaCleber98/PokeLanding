import {
  EvolutionData,
  SpeciesInformation,
} from '@/lib/api/poke-api/types/types';
import { mapEvolution } from '@/services/pokemon';
import PokemonEvolutionChart from './pokemon-evolution-chart/pokemon-evolution-chart';
import { getPokemonSpeciesByNameOrId } from '@/lib/api/poke-api/api';

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

      return { envolve_from: speciesInfo.evolves_from_species.name, ...item };
    })
  );

  mappedEvolutionHierarchy = mappedEvolutionHierarchy.map((item, _, array) => {
    const children = array.filter(
      (child) => child.envolve_from === item.species_name
    );
    return {
      ...item,
      envolves_to: [...children.map((child) => child.species_name)],
    };
  });

  const baseEvolution = mappedEvolutionHierarchy.find(
    (item) => !item.envolve_from
  );
  mappedEvolutionHierarchy = mappedEvolutionHierarchy.filter(
    (item) => item.species_name !== baseEvolution?.species_name
  );
  console.log(baseEvolution);
  console.log(mappedEvolutionHierarchy);
  return (
    <>
      <PokemonEvolutionChart
        pokemon={baseEvolution!}
        evolutionList={mappedEvolutionHierarchy}
      />
    </>
  );
}
