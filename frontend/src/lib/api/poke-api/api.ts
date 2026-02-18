import { PokeApiListResponse, PokemonEntity } from './types';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

// ─── Fetch Pokemon List ───────────────────────────────────────────────
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokeApiListResponse> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`
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
