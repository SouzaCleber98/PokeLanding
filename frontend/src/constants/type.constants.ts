import { TypeName } from '@/lib/api/poke-api/types';

export const POKEMON_TYPES_CONSTANTS: Record<
  TypeName,
  { color: string; icon: string }
> = {
  normal: {
    color: '#A8A77A',
    icon: '/images/icons/poke-types/normal.svg',
  },
  fighting: {
    color: '#C22E28',
    icon: '/images/icons/poke-types/fighting.svg',
  },
  flying: {
    color: '#A98FF3',
    icon: '/images/icons/poke-types/flying.svg',
  },
  poison: {
    color: '#A33EA1',
    icon: '/images/icons/poke-types/poison.svg',
  },
  ground: {
    color: '#E2BF65',
    icon: '/images/icons/poke-types/ground.svg',
  },
  rock: {
    color: '#B6A136',
    icon: '/images/icons/poke-types/rock.svg',
  },
  bug: {
    color: '#A6B91A',
    icon: '/images/icons/poke-types/bug.svg',
  },
  ghost: {
    color: '#735797',
    icon: '/images/icons/poke-types/ghost.svg',
  },
  steel: {
    color: '#B7B7CE',
    icon: '/images/icons/poke-types/steel.svg',
  },
  fire: {
    color: '#EE8130',
    icon: '/images/icons/poke-types/fire.svg',
  },
  water: {
    color: '#6390F0',
    icon: '/images/icons/poke-types/water.svg',
  },
  grass: {
    color: '#7AC74C',
    icon: '/images/icons/poke-types/grass.svg',
  },
  electric: {
    color: '#F7D02C',
    icon: '/images/icons/poke-types/electric.svg',
  },
  psychic: {
    color: '#F95587',
    icon: '/images/icons/poke-types/psychic.svg',
  },
  ice: {
    color: '#96D9D6',
    icon: '/images/icons/poke-types/ice.svg',
  },
  dragon: {
    color: '#6F35FC',
    icon: '/images/icons/poke-types/dragon.svg',
  },
  dark: {
    color: '#705746',
    icon: '/images/icons/poke-types/dark.svg',
  },
  fairy: {
    color: '#D685AD',
    icon: '/images/icons/poke-types/fairy.svg',
  },
  stellar: {
    color: '#7CC7B2',
    icon: '',
  },
  unknown: {
    color: '#68A090',
    icon: '',
  },
};
