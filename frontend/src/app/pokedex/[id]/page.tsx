import {
  getPokemonByNameOrId,
  getPokemonSpeciesByNameOrId,
} from '@/lib/api/poke-api/api';
import { PokemonEntity, SpeciesInformation } from '@/lib/api/poke-api/types';
import { cn } from '@/lib/utils';

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let pokemonData: PokemonEntity | null = null;
  let speciesInfo: SpeciesInformation | null = null;

  try {
    pokemonData = await getPokemonByNameOrId(id);
    speciesInfo = await getPokemonSpeciesByNameOrId(id);
  } catch (e) {
    console.error(e);
  }

  if (!pokemonData || !speciesInfo) {
    return <section>Pokemon not found</section>;
  }

  const pokemonMetrics = [
    { label: 'Altura', value: `${(pokemonData.height / 10).toFixed(1)} m` },
    { label: 'Peso', value: `${(pokemonData.weight / 10).toFixed(1)} kg` },
  ];

  return (
    <section className='flex flex-col justify-center items-center'>
      <div className='h-fit w-fit p-4 flex flex-col text-center bg-white/15 rounded-4xl gap-y-4 items-center'>
        <h2 className='w-fit p-2 font-bold bg-white rounded-full '>
          {speciesInfo.genera[7].genus}
        </h2>

        <p className='text-sm text-white'>
          {speciesInfo.flavor_text_entries[0].flavor_text
            .replace(/\f/g, ' ')
            .replace(/\n/g, ' ')}
        </p>
      </div>

      <div className='flex  flex-col sm:flex-row justify-center my-10  gap-6'>
        {pokemonMetrics.map((metric) => (
          <div
            key={metric.label}
            className='flex justify-between items-center gap-2 bg-white/15 p-3 rounded-4xl'
          >
            <p className='text-md font-semibold uppercase text-white/60'>
              {metric.label}:
            </p>
            <span className='text-xs font-bold text-white'>{metric.value}</span>
          </div>
        ))}
      </div>

      <div className='flex flex-col gap-2  items-center bg-white/15 p-3 rounded-4xl'>
        <h3 className='text-xs font-bold uppercase text-white/60'>abilities</h3>
        <div className='flex gap-3 flex-col sm:flex-row'>
          {pokemonData.abilities.map((ability) => (
            <div
              key={ability.ability?.name}
              className={cn(
                'text-center bg-white/10 rounded-full p-3 capitalize',
                ability.is_hidden && 'bg-yellow-200/50'
              )}
            >
              <p className=' font-bold text-white'>{ability.ability?.name}</p>
              {ability.is_hidden && (
                <span className='text-xs font-bold p-1 rounded-full text-yellow-300'>
                  Hidden Ability
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
