import TypeIcon from '@/components/ui/type-icon';

import {
  Name,
  PokemonEntity,
  SpeciesInformation,
  TypeName,
} from '@/lib/api/poke-api/types/types';
import Image from 'next/image';

type PokedexHeroProps = {
  pokemonData: PokemonEntity;
  speciesData: SpeciesInformation;
};

export default function PokedexHero({
  pokemonData,
  speciesData,
}: PokedexHeroProps) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='text-center bg-black/10 py-1 px-3 rounded-full'>
        <span className='font-bold text-white/80'>
          #{String(pokemonData.id).padStart(4, '0')}
        </span>

        <h1 className='mb-3 text-center capitalize text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white/80 '>
          {pokemonData!.name.replaceAll('-', ' ')}
        </h1>
      </div>

      <div className='flex relative justify-center select-none my-3'>
        <Image
          src='/images/icons/default/pokeball.svg'
          alt={pokemonData!.name}
          height={200}
          width={200}
          className=' absolute opacity-30 animate-[spin_6s_linear_infinite]'
        />
        <Image
          src={pokemonData!.sprites.front_default}
          alt={pokemonData!.name}
          height={180}
          width={180}
          className='z-10 drop-shadow-md hover:scale-120 duration-200'
        />
      </div>
      <div className='flex gap-1'>
        {pokemonData?.types.map((type) => (
          <div key={type.type.name} className='flex-1 '>
            <TypeIcon size='md' type={type.type.name as TypeName} />
          </div>
        ))}
      </div>
    </div>
  );
}
