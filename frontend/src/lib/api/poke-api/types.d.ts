// PokeAPI types

/**
 * Response from the PokeAPI when fetching a list of Pokemon.
 * The `results` field contains an array of Pokemon names and their corresponding URLs for more details.
 */

export type PokeApiResponse = {
  count: number;
  next: string;
  previous: any;
  results: NamedApiResource[];
};

export type NamedApiResource = {
  name: string;
  url: string;
};

// ─── Pokemon Entity ──────────────────────────────────────────────────

/**
 * Response from the PokeAPI when fetching detailed information about a specific Pokemon by name or ID.
 * The `PokemonEntity` type represents the detailed information about a single Pokemon.
 */
export type PokemonEntity = {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStats[];
  weight: number;
  height: number;
  sprites: PokeSpriteDetails;
  abilities: PokemonAbility[];
  moves: PokemonMoveInfo[];
  base_experience: number;
  cries: PokemonCries;
  species: NamedApiResource;
};

// ─── Pokemon Sub-types ───────────────────────────────────────────────

export type PokemonAbility = {
  ability: NamedApiResource | null;
  is_hidden: boolean;
  slot: number;
};

export type PokemonCries = {
  latest: string;
  legacy: string;
};

export type PokemonMoveInfo = {
  move: NamedApiResource;
  version_group_details: PokemonMoveVersion[];
};

export type PokemonMoveVersion = {
  level_learned_at: number;
  move_learn_method: NamedApiResource;
  order: number | null;
  version_group: NamedApiResource;
};

export type PokemonStats = {
  base_stat: number;
  effort: number;
  stat: StatDetails;
};

export type StatDetails = {
  name: StatName;
  url: string;
};

export type PokemonType = {
  slot: number;
  type: TypeDetails;
};

export type TypeDetails = {
  name: TypeName;
  url: string;
};

// ─── Pokemon Sprites ─────────────────────────────────────────────────

export type PokeSpriteDetails = FullSpriteSet & {
  other?: PokemonSpritesOther;
  versions?: PokemonSpritesVersions;
};

// ─── Generation Sprites ──────────────────────────────────────────────

export type PokemonSpritesVersions = {
  'generation-i': GenerationISprites;
  'generation-ii': GenerationIISprites;
  'generation-iii': GenerationIIISprites;
  'generation-iv': GenerationIVSprites;
  'generation-v': GenerationVSprites;
  'generation-vi': GenerationVISprites;
  'generation-vii': GenerationVIISprites;
  'generation-viii': GenerationVIIISprites;
  'generation-ix': GenerationIXSprites;
};

type GenISprite = {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
};

export type GenerationISprites = {
  'red-blue': GenISprite;
  yellow: GenISprite;
};

type GenIICrystalSprite = {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
};

type GenIIGoldSilverSprite = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
};

export type GenerationIISprites = {
  crystal: GenIICrystalSprite;
  gold: GenIIGoldSilverSprite;
  silver: GenIIGoldSilverSprite;
};

type BackFrontShinySprite = {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
};

export type GenerationIIISprites = {
  emerald: OfficialArtwork;
  'firered-leafgreen': BackFrontShinySprite;
  'ruby-sapphire': BackFrontShinySprite;
};

export type GenerationIVSprites = {
  'diamond-pearl': FullSpriteSet;
  'heartgold-soulsilver': FullSpriteSet;
  platinum: FullSpriteSet;
};

export type GenerationVSprites = {
  'black-white': FullSpriteSet & {
    animated: FullSpriteSet;
  };
};

export type GenerationVISprites = {
  'omegaruby-alphasapphire': Home;
  'x-y': Home;
};

export type GenerationVIISprites = {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
};

export type GenerationVIIISprites = {
  'brilliant-diamond-shining-pearl': DreamWorld;
  icons: DreamWorld;
};

export type GenerationIXSprites = {
  'scarlet-violet': DreamWorld;
};

// ─── Sprite Utility Types ────────────────────────────────────────────

// The `FullSpriteSet` type represents the complete set of sprite images for a Pokemon, including both default and shiny versions
type FullSpriteSet = {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

export type PokemonSpritesOther = {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
  showdown: FullSpriteSet;
};

export type OfficialArtwork = {
  front_default: string;
  front_shiny: string;
};

type Home = {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
};

type DreamWorld = {
  front_default: string;
  front_female: string | null;
};

export type SpeciesInformation = {
  base_happiness: number;
  capture_rate: number;
  color: NamedApiResource;
  egg_groups: NamedApiResource[];
  evolution_chain: EvolutionChain;
  evolves_from_species: null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  generation: NamedApiResource;
  growth_rate: NamedApiResource;
  habitat: NamedApiResource;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  name: string;
  names: Name[];
  genera: Genus[];
};

export type EvolutionChain = {
  url: string;
};

export type Genus = {
  genus: string;
  language: NamedApiResource;
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: NamedApiResource;
  version: NamedApiResource;
};

export type Name = {
  language: NamedApiResource;
  name: string;
};

export type Type = {
  damage_relations: DamageRelations;
  pokemon: TypePokemon[];
};

export type DamageRelations = {
  double_damage_from: NamedApiResource[];
  double_damage_to: NamedApiResource[];
  half_damage_from: NamedApiResource[];
  half_damage_to: NamedApiResource[];
  no_damage_from: NamedApiResource[];
  no_damage_to: NamedApiResource[];
};

export type TypePokemon = {
  pokemon: NamedApiResource;
  slot: number;
};

// ─── Stat & Type Literals ────────────────────────────────────────────

export type StatName =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

export type TypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stellar'
  | 'unknown';

export type Generation =
  | 'all'
  | 'generation-i'
  | 'generation-ii'
  | 'generation-iii'
  | 'generation-iv'
  | 'generation-v'
  | 'generation-vi'
  | 'generation-vii'
  | 'generation-viii'
  | 'generation-ix';
