import { NamedApiResource } from '@/lib/api/poke-api/types/types';

export type PokemonEvolution = {
  species_name: string;
  min_level?: number | null;
  trigger_name?: string | null;
  item?: NamedApiResource | null;
  evolve_from?: string;
  evolves_to?: string[];
};
