export interface Pokemon {
  name: string;
  url: string;
}

interface Ability {
  ability: {
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string
  }
  abilities: Ability[]
}
