import { NavCart, NavLogo, NavSearch } from "."
import { NavProps} from "../../interfaces/Nav";

export const Nav = (props: NavProps) => {
  return (
   <header>
     <nav
      className="w-full bg-blue-700 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
      <div className="w-full max-w-7xl m-auto flex flex-wrap items-center md:justify-center md:flex sm:justify-center lg:justify-between px-6 py-2">
        <div className="flex items-center my-4">
          <NavLogo />
        </div>
        <div className="flex items-center">
          <NavSearch
            search={props.search}
            setSearch={props.setSearch}
            handleOpenDiv={props.handleOpenDiv}
            totalQuantity={props.totalQuantity}
            pokemonState={props.pokemonState}
          />
          <div className="ml-20 my-4 flex items-center space-x-0 relative">
            <NavCart 
              handleOpenDiv={props.handleOpenDiv} 
            />
            <span 
              typeof="number" 
              className="z-10 absolute left-10 mt-12 bg-blue-700 text-white font-bold px-2 py-1 rounded-md ml-2 border border-yellow-300"
            >
              {props.totalQuantity}
            </span>
          </div>
        </div>
      </div>
    </nav>
   </header>
  );
};