import { EvolutionData, Type } from '@/lib/api/poke-api/types/types';
import { PokemonEvolution } from '@/types/types';

type TypeEffectiveness = { typeName: string; multiplier: number };

// This function calculates the type matchups for a given array of Pokemon types.
export function calculateTypeMatchups(types: Type[]) {
  const weaknessesPerType = types.map((type) =>
    type.damage_relations.double_damage_from.map((relation) => relation.name)
  );

  const allWeaknesses = weaknessesPerType.flat();

  const aggregatedWeaknesses = aggregateDamageTypes(allWeaknesses, 'weak');

  const resistancesPerType = types.map((type) =>
    type.damage_relations.half_damage_from.map((relation) => relation.name)
  );

  const allResistances = resistancesPerType.flat();

  const aggregatedResistances = aggregateDamageTypes(allResistances, 'resist');

  const immunitiesPerType = types.map((type) =>
    type.damage_relations.no_damage_from.map((relation) => relation.name)
  );

  const allImmunities = immunitiesPerType.flat();

  const aggregatedImmunities = aggregateDamageTypes(allImmunities, 'no-damage');

  return adjustDamageMatchups(
    aggregatedWeaknesses,
    aggregatedResistances,
    aggregatedImmunities
  );
}

const aggregateDamageTypes = (
  typeNames: string[],
  category: 'weak' | 'resist' | 'no-damage'
) => {
  const result: TypeEffectiveness[] = [];
  let remainingTypes = ['', ...typeNames];

  for (let i = 0; i < typeNames.length; i++) {
    let occurrences = 0;
    for (let j = 0; j < remainingTypes.length; j++) {
      if (typeNames[i] === remainingTypes[j]) {
        occurrences++;
        remainingTypes.splice(j, 1);
      }
    }

    if (occurrences > 0) {
      let damageMultiplier = 0;
      if (category === 'resist') {
        damageMultiplier = 0.5 / occurrences;
      } else if (category === 'weak') {
        damageMultiplier = 2 * occurrences;
      } else {
        damageMultiplier = 0;
      }

      result.push({ typeName: typeNames[i], multiplier: damageMultiplier });
    }
  }

  return result;
};

const adjustDamageMatchups = (
  weaknesses: TypeEffectiveness[],
  resistances: TypeEffectiveness[],
  immunities: TypeEffectiveness[]
) => {
  let overlappingMatchups: TypeEffectiveness[] = [];

  let remainingWeaknesses = [...weaknesses];
  let remainingResistances = [...resistances];

  for (let i = 0; i < weaknesses.length; i++) {
    for (let j = 0; j < resistances.length; j++) {
      if (resistances[j].typeName === weaknesses[i].typeName) {
        const adjustedMultiplier =
          weaknesses[i].multiplier * resistances[j].multiplier;
        remainingWeaknesses = remainingWeaknesses.filter(
          (item) => item.typeName !== weaknesses[i].typeName
        );
        remainingResistances = remainingResistances.filter(
          (item) => item.typeName !== resistances[j].typeName
        );
        overlappingMatchups.push({
          typeName: weaknesses[i].typeName,
          multiplier: adjustedMultiplier,
        });
      }
    }
  }

  overlappingMatchups = [
    ...overlappingMatchups,
    ...remainingWeaknesses,
    ...remainingResistances,
  ];

  let remainingImmunities = [...immunities];
  for (let i = 0; i < immunities.length; i++) {
    for (let j = 0; j < overlappingMatchups.length; j++) {
      if (overlappingMatchups[j].typeName === immunities[i].typeName) {
        const adjustedMultiplier =
          immunities[i].multiplier * overlappingMatchups[j].multiplier;
        remainingImmunities = remainingImmunities.filter(
          (item) => item.typeName !== immunities[i].typeName
        );

        overlappingMatchups[j] = {
          typeName: overlappingMatchups[j].typeName,
          multiplier: adjustedMultiplier,
        };
      }
    }
  }

  const allMatchups = [...overlappingMatchups, ...remainingImmunities];

  return allMatchups.filter((matchup) => matchup.multiplier !== 1);
};

// This function maps the evolution data from the PokeAPI to a more usable format for the application.
export function mapEvolution(evolutionData: EvolutionData) {
  let evolutionChain: PokemonEvolution[] = [];
  let evolutionChainData = evolutionData.chain;

  do {
    let numberOfEvolutions = evolutionChainData.evolves_to.length;

    evolutionChain.push({
      species_name: evolutionChainData?.species.name,
      min_level: evolutionChainData?.evolution_details[0]?.min_level,
      trigger_name: evolutionChainData?.evolution_details[0]?.trigger?.name,
      item: evolutionChainData?.evolution_details[
        evolutionChainData?.evolution_details.length - 1
      ]?.item?.name,
      time_of_day:
        evolutionChainData?.evolution_details[0]?.time_of_day || null,
      min_happiness:
        evolutionChainData?.evolution_details[0]?.min_happiness || null,
      gender: evolutionChainData?.evolution_details[0]?.gender || null,
    });

    if (numberOfEvolutions > 1) {
      for (let i = 1; i < numberOfEvolutions; i++) {
        evolutionChain.push({
          species_name: evolutionChainData.evolves_to[i]?.species.name,
          min_level:
            evolutionChainData.evolves_to[i]?.evolution_details[0]?.min_level,
          trigger_name:
            evolutionChainData.evolves_to[i]?.evolution_details[0]?.trigger
              ?.name,
          item: evolutionChainData.evolves_to[i]?.evolution_details[
            evolutionChainData.evolves_to[i]?.evolution_details.length - 1
          ]?.item?.name,
          time_of_day:
            evolutionChainData.evolves_to[i]?.evolution_details[0]
              ?.time_of_day || null,
          min_happiness:
            evolutionChainData.evolves_to[i]?.evolution_details[0]
              ?.min_happiness || null,
          gender:
            evolutionChainData.evolves_to[i]?.evolution_details[0]?.gender ||
            null,
        });
      }
    }

    evolutionChainData = evolutionChainData.evolves_to[0];
  } while (
    evolutionChainData != undefined &&
    evolutionChainData.hasOwnProperty('evolves_to')
  );

  return evolutionChain;
}
