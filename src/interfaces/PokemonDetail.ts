import { PokemonDetail } from "./Pokemon";

export interface PokemonDetailProps {
    handleOpenDialog: (pokemonId: number) => void;
    handleCloseDialog: () => void;
    loading: boolean;
    errorRequest: boolean;
    filteredPokemons: PokemonDetail[];
    showDataById: number;
    pokemonState: PokemonDetail;
    addToCart: (event: React.MouseEvent<HTMLElement>, pokemon: PokemonDetail) => void;
  }