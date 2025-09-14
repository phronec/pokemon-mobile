interface PokemonSprites {
  other: {
    ["official-artwork"]: {
      front_default: string | null;
    };
  };
}

interface PokemonStat {
  base_stat: number;
  stat: { name: string };
}

interface PokemonMove {
  move: { name: string };
}

interface PokemonType {
  slot: number;
  type: { name: string };
}

interface Pokemon {
  id: number;
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  moves: PokemonMove[];
  types: PokemonType[];
}

export type { Pokemon, PokemonStat, PokemonMove, PokemonType };
