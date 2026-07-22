import PokemonList from '@/components/pokemon/pokemon-list/pokemon-list';
import { POKEMONSBYGENERATION } from '@/constants';
import { getGenerationList, getPokemonList } from '@/lib/api/poke-api/api';
import { Generation, NamedApiResource } from '@/lib/api/poke-api/types/types';

type PokedexPageProps = {
  searchParams: Promise<{
    search?: string;
    generation?: Generation;
    currentPage?: string;
  }>;
};

const limit = 5;

export default async function PokedexPage({ searchParams }: PokedexPageProps) {
  const { currentPage, generation = 'all', search } = await searchParams;

  let page = Number(currentPage);
  let pokemonList: NamedApiResource[] = [];
  let generationList: NamedApiResource[] = [];

  try {
    if (!Number.isFinite(page) || page <= 0) {
      page = 1;
    }

    generationList = (await getGenerationList()).results;

    if (search) {
      const data = await getPokemonList(POKEMONSBYGENERATION['all'].end);

      pokemonList = data.results.filter((item) => {
        const isNumericSearch = /^\d+$/.test(search);

        if (isNumericSearch) {
          return item.url.split('/').at(-2)?.includes(search);
        }
        return item.name.includes(search);
      });
    } else if (generation && generation !== 'all') {
      const data = await getPokemonList(
        POKEMONSBYGENERATION[generation].end -
          POKEMONSBYGENERATION[generation].start,
        POKEMONSBYGENERATION[generation].start
      );

      pokemonList = data.results;
    } else {
      const data = await getPokemonList(POKEMONSBYGENERATION['all'].end);
      pokemonList = data.results;
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <section>
      <PokemonList
        pokemonData={pokemonList}
        limit={limit}
        generationList={generationList}
        currentPageParam={page}
        generationParam={generation}
      />
    </section>
  );
}
