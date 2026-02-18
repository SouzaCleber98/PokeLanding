import type { Generation } from '@/lib/api/poke-api/types';

export const navigationLinks = [
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
