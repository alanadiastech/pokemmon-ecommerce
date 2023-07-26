import { Dispatch, SetStateAction } from "react";
import { PokemonDetail } from "./Pokemon";

export interface NavProps {
    search: string
    setSearch: Dispatch<SetStateAction<string>>;
    handleOpenDiv: () => void;
    totalQuantity: number;
    pokemonState: PokemonDetail;
  }
