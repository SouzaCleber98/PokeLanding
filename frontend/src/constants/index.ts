import type {
  Generation,
  StatName,
  TypeName,
} from '@/lib/api/poke-api/types/types';

export const navigationLinks = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/pokedex',
    label: 'Pokedex',
  },

  {
    href: '/sign-in',
    label: 'Login',
  },

  {
    href: '/sign-up',
    label: 'Cadastro',
  },
];

export const carouselImages = [
  {
    src: '/images/pokemon/bulbasaur.png',
    label: 'Bulbasaur',
  },

  {
    src: '/images/pokemon/squirtle.png',
    label: 'Squirtle',
  },

  {
    src: '/images/pokemon/charmander.png',
    label: 'Charmander',
  },

  {
    src: '/images/pokemon/pikachu.png',
    label: 'Pikachu',
  },
];

export const POKEMONSBYGENERATION: Record<
  Generation,
  { start: number; end: number }
> = {
  all: {
    start: 0,
    end: 1008,
  },
  'generation-i': {
    start: 0,
    end: 151,
  },
  'generation-ii': {
    start: 151,
    end: 250,
  },
  'generation-iii': {
    start: 251,
    end: 386,
  },
  'generation-iv': {
    start: 386,
    end: 493,
  },
  'generation-v': {
    start: 493,
    end: 649,
  },
  'generation-vi': {
    start: 649,
    end: 721,
  },
  'generation-vii': {
    start: 721,
    end: 809,
  },
  'generation-viii': {
    start: 809,
    end: 905,
  },
  'generation-ix': {
    start: 905,
    end: 1008,
  },
};

export const STAT_NAMES: Record<StatName, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

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

export const FORM_FIELDS: Record<
  string,
  { label: string; type: string; placeholder: string }
> = {
  email: {
    label: 'E-mail',
    type: 'email',
    placeholder: 'Digite seu e-mail',
  },
  password: {
    label: 'Senha',
    type: 'password',
    placeholder: 'Digite sua senha',
  },
  name: {
    label: 'Nome',
    type: 'text',
    placeholder: 'Digite seu nome',
  },
  confirmPassword: {
    label: 'Confirmar Senha',
    type: 'password',
    placeholder: 'Confirme sua senha',
  },
};
