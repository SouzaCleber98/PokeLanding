import PokemonList from '@/components/pokemon-list/pokemon-list';
import { POKEMONSBYGENERATION } from '@/constants';
import { getGenerationList, getPokemonList } from '@/lib/api/poke-api/api';
import {
  Generation,
  NamedApiResource,
  PokeApiResponse,
} from '@/lib/api/poke-api/types';

type PokedexPageProps = {
  searchParams: Promise<{
    search: string;
    generation: Generation;
    currentPage: number;
  }>;
};

const limit = 5;

export default async function PokedexPage({ searchParams }: PokedexPageProps) {
  const { currentPage = 1, generation = 'all' } = await searchParams;

  let pokemonList: NamedApiResource[];

  const generationList = await getGenerationList();

  if (generation && generation !== 'all') {
    const data = await getPokemonList(
      limit,
      POKEMONSBYGENERATION[generation].start + (currentPage - 1) * limit,
      generation
    );

    pokemonList = data.results;
  } else {
    const data = await getPokemonList(limit, (currentPage - 1) * limit);
    pokemonList = data.results;
  }

  return (
    <section>
      <PokemonList
        pokemonData={pokemonList}
        limit={limit}
        generationList={generationList}
      />
    </section>
  );
}
