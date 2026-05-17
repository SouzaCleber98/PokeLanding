export type PokemonEvolution = {
  species_name: string;
  min_level?: number | null;
  trigger_name?: string | null;
  item?: string | null;
  time_of_day?: string | null;
  min_happiness?: number | null;
  evolve_from?: string;
  evolves_to?: string[];
  gender?: number | null;
};
