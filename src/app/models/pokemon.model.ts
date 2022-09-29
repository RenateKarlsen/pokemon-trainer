export interface Pokemon {
  id: string;
  name: string;
  url: string;
  imageUrl: string;
}

export interface PokemonResult {
  results: Pokemon[];
}

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/120.png
