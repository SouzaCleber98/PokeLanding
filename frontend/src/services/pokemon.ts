import { Type } from '@/lib/api/poke-api/types';

type TypeEffectiveness = { typeName: string; multiplier: number };

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
