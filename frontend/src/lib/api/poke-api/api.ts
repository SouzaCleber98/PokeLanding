import { POKEMONSBYGENERATION } from '@/constants';
import { PokeApiResponse, PokemonEntity } from './types';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

// ─── Fetch Pokemon List ───────────────────────────────────────────────
export async function getPokemonList(
  limit = 20,
  offset = 0,
  generation: keyof typeof POKEMONSBYGENERATION = 'all'
): Promise<PokeApiResponse> {
  const maxOffset = POKEMONSBYGENERATION[generation].end - limit;

  if (offset > maxOffset) {
    limit = POKEMONSBYGENERATION[generation].end - offset;
  }

  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 60 * 60 },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pokemon list: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}

// ─── Fetch Pokemon by Name or ID ───────────────────────────────────────────────
export async function getPokemonByNameOrId(
  pokemonIdOrName: string | number
): Promise<PokemonEntity> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon/${pokemonIdOrName}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pokemon details: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}

export async function getGenerationList(): Promise<PokeApiResponse> {
  const response = await fetch(`${POKE_API_BASE_URL}/generation`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch generation list: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}
