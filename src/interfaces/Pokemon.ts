import { Dispatch, SetStateAction } from "react";
import { Cart } from "./Cart";

export interface PokemonDetail {
  id: number;
  name: string;
  types: [{ type: { name: string } }];
  weight: number;
  height: number;
  stats: [{ base_stat: number; stat: { name: string } }];
  imageUrl: string;
  price: number;
  abilityes: string;
}

export interface PokemonStoreContainerType {
  pokemons: PokemonDetail[];
  getPageNumbers: () => Array<number | string>;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  filteredPokemons: PokemonDetail[];
  indexOfFirstPokemon: any;
  pokemonState: PokemonDetail;
  currentPage: number;
  currentPokemons: PokemonDetail[];
  pokemonsPerPage: number;
  paginate: (pageNumber: number) => void;
  search: string
  setSearch: Dispatch<SetStateAction<string>>;
  loading: boolean;
  errorRequest: boolean;
  message: string;
  showAlert: boolean;
  handleCloseAlert: () => void;
  handleOpenDialog: (pokemonId: number) => void;
  handleCloseDialog: () => void;
  openDialog: boolean;
  showDiv: boolean;
  handleOpenDiv: () => void;
  handleCloseDiv: () => void;
  showDataById: number;
  addToCart: (event: React.MouseEvent<HTMLElement>, pokemon: PokemonDetail) => void;
  cartValues: Cart;
  removeFromCart: (pokemon: PokemonDetail) => void;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>, pokemon: PokemonDetail) => void;
  totalQuantity: number;
}

export interface PokemonCartProps {
  loading: boolean;
  errorRequest: boolean;
  handleCloseDiv: () => void;
  cartValues: Cart;
  removeFromCart: (pokemon: PokemonDetail) => void;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>, pokemon: PokemonDetail) => void;
}

export interface PaypalCheckoutProps {
  cartValues: Cart;
  message: string;
  handleCloseAlert: () => void;
}