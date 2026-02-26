import StatBar from '@/components/ui/stat-bar';
import TypeMatchup from '@/components/ui/type-matchup';
import { getPokemonByNameOrId, getTypeRelation } from '@/lib/api/poke-api/api';
import { PokemonEntity, Type, TypeName } from '@/lib/api/poke-api/types';
import { calculateTypeMatchups } from '@/services/pokemon';

export default async function PokemonStatsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let pokemonData: PokemonEntity | null = null;
  let damageRelation: Type[] = [];

  try {
    pokemonData = await getPokemonByNameOrId(id);
    damageRelation = await Promise.all(
      pokemonData?.types.map(
        async (type) => await getTypeRelation(type.type.name)
      )
    );
  } catch (e) {
    console.error(e);
  }

  if (!pokemonData) {
    return <section>Pokemon not found</section>;
  }

  const typeMatchups = calculateTypeMatchups(damageRelation);

  const weaknesses = typeMatchups.filter((item) => item.multiplier > 1);
  const resistances = typeMatchups.filter(
    (item) => item.multiplier < 1 && item.multiplier !== 0
  );
  const immunities = typeMatchups.filter((item) => item.multiplier === 0);

  return (
    <section className='text-center'>
      <div className='flex flex-col gap-2 bg-white/15 px-2 py-4 rounded-4xl'>
        <h3 className='font-bold text-white capitalize'>base Stats</h3>
        {pokemonData.stats.map((stat) => (
          <div key={stat.stat.name}>
            <StatBar statName={stat.stat.name} value={stat.base_stat} />
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-2 bg-white/15 px-2 py-4 rounded-4xl my-6 '>
        <h3 className='font-bold text-white capitalize'>type Matchup</h3>

        {weaknesses.length > 0 && (
          <div>
            <h4 className='text-xs font-bold uppercase text-white/60 mt-4 mb-3'>
              weaknesses:
            </h4>
            <div className='flex flex-col sm:flex-row justify-center items-center flex-wrap gap-4'>
              {weaknesses.map((type) => (
                <TypeMatchup
                  key={type.typeName}
                  multiplier={type.multiplier}
                  type={type.typeName as TypeName}
                />
              ))}
            </div>
          </div>
        )}

        {resistances.length > 0 && (
          <div>
            <h4 className='text-xs font-bold uppercase text-white/60 mt-4 mb-3'>
              resistances:
            </h4>
            <div className='flex flex-col sm:flex-row justify-center items-center flex-wrap gap-2'>
              {resistances.map((type) => (
                <TypeMatchup
                  key={type.typeName}
                  multiplier={type.multiplier}
                  type={type.typeName as TypeName}
                />
              ))}
            </div>
          </div>
        )}

        {immunities.length > 0 && (
          <div>
            <h4 className='text-xs font-bold uppercase text-white/60 mt-4 mb-3'>
              immunities:
            </h4>
            <div className='flex flex-col sm:flex-row justify-center items-center flex-wrap gap-2'>
              {immunities.map((type) => (
                <TypeMatchup
                  key={type.typeName}
                  multiplier={type.multiplier}
                  type={type.typeName as TypeName}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
