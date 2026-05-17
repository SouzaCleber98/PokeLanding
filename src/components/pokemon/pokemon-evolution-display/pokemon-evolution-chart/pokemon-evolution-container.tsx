'use client';

import { Xwrapper } from 'react-xarrows';
import PokemonEvolutionChart from './pokemon-evolution-chart';
import { PokemonEvolution } from '@/types/types';

type PokemonEvolutionContainerProps = {
  firstEvolution: PokemonEvolution;
  evolutionList: PokemonEvolution[];
};

export default function PokemonEvolutionContainer({
  firstEvolution,
  evolutionList,
}: PokemonEvolutionContainerProps) {
  return (
    <Xwrapper>
      <div className='flex items-center justify-evenly flex-wrap gap-6 xs:gap-15 md:gap-20'>
        <PokemonEvolutionChart
          pokemon={firstEvolution}
          evolutionList={evolutionList}
        />
      </div>
    </Xwrapper>
  );
}
