import { PokemonDetail } from "./Pokemon";

export interface PaginationProps {
    getPageNumbers: () => Array<number | string>;
    handlePreviousPage: () => void;
    handleNextPage: () => void;
    currentPage: number;
    currentPokemons: PokemonDetail[];
    pokemonsPerPage: number;
    filteredPokemons: PokemonDetail[];
    indexOfFirstPokemon: any; 
    paginate : (pageNumber: number) => void;
  }