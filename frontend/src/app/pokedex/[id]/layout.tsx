import PokedexHero from '@/components/pokemon/pokedex-detail/pokedex-hero';
import PokedexFooter from '@/components/pokemon/pokedex-detail/pokedex-layout/pokedex-footer';
import PokedexHeader from '@/components/pokemon/pokedex-detail/pokedex-layout/pokedex-header';
import PokedexMain from '@/components/pokemon/pokedex-detail/pokedex-layout/pokedex-main';
import PokedexNavMenu from '@/components/pokemon/pokedex-detail/pokedex-nav-menu';
import NavButton from '@/components/ui/nav-button';

import {
  getPokemonByNameOrId,
  getPokemonSpeciesByNameOrId,
} from '@/lib/api/poke-api/api';
import {
  PokemonEntity,
  SpeciesInformation,
} from '@/lib/api/poke-api/types/types';

type PokedexLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export default async function PokedexLayout({
  children,
  params,
}: PokedexLayoutProps) {
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

  return (
    <>
      <PokedexHeader />

      <PokedexMain mainColor={speciesInfo.color.name}>
        <PokedexHero pokemonData={pokemonData} speciesData={speciesInfo} />
        <PokedexNavMenu id={pokemonData.id} />
        <NavButton />
        {children}
      </PokedexMain>
      <PokedexFooter />
    </>
  );
}
