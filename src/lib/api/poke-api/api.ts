import { POKEMONSBYGENERATION } from '@/constants';
import {
  EvolutionData,
  PokeApiResponse,
  PokemonEntity,
  SpeciesInformation,
  Type,
  TypeName,
} from './types/types';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

const CACHE_CONFIG = {
  next: { revalidate: 86400 },
};

// ─── Fetch Pokemon List ───────────────────────────────────────────────
export async function getPokemonList(
  limit = 20,
  offset = 0
): Promise<PokeApiResponse> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon/?limit=${limit}&offset=${offset}`,

    CACHE_CONFIG
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
    `${POKE_API_BASE_URL}/pokemon/${pokemonIdOrName}`,

    CACHE_CONFIG
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pokemon details: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}

// ─── Fetch Generation List ───────────────────────────────────────────────
export async function getGenerationList(): Promise<PokeApiResponse> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/generation`,

    CACHE_CONFIG
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch generation list: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}

// ─── Fetch Pokemon Species by Name or ID ───────────────────────────────────────────────
export async function getPokemonSpeciesByNameOrId(
  pokemonIdOrName: string | number
): Promise<SpeciesInformation> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/pokemon-species/${pokemonIdOrName}`,

    CACHE_CONFIG
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch pokemon species details: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}

// ─── Fetch Type Relation by Type Name or ID ───────────────────────────────────────────────
export async function getTypeRelation(type: TypeName | number): Promise<Type> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/type/${type}`,
    CACHE_CONFIG
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch type relation details: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}

// ─── Fetch Evolution Chain by ID ───────────────────────────────────────────────
export async function getEvolutionChainById(
  id: number
): Promise<EvolutionData> {
  const response = await fetch(
    `${POKE_API_BASE_URL}/evolution-chain/${id}`,
    CACHE_CONFIG
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch evolution chain details: status: ${response.status}, statusText: ${response.statusText}`
    );
  }

  return response.json();
}
