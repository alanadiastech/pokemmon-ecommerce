import { PokemonDetail } from "./Pokemon";

export interface Cart {
    pokeValues: { 
      pokemon: PokemonDetail; 
      qtd: number; 
      total: number 
    }[];
    total: number;
  }