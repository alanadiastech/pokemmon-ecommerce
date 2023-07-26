
import { PokemonStoreContainer } from "./PokemonStoreContainer";
import { AlertMessage, Nav, Pagination } from "../../componentes";
import pokeLoad from "/src/assets/butterfree.gif";
import { PokemonCart } from "../PokemonCart/PokemonCart";
import { PokemonDetail } from "../PokemonDetail/PokemonDetail";
import { useLocation } from "react-router-dom";
import { AlertMessageSuccess } from "../../componentes/Alert/AlertMessageSuccess";

export const PokemonStore = () => {

  const container = PokemonStoreContainer();
  const location = useLocation();
  const { state } = location;
  const message = state?.message || null;

  return (
    <>
      <Nav
        search={container.search}
        setSearch={container.setSearch}
        handleOpenDiv={container.handleOpenDiv}
        totalQuantity={container.totalQuantity}
        pokemonState={container.pokemonState}
      />
      <div className="font-poppins">
      {container.loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-blue-700">
              Carregando...
            </h1>
            <img src={pokeLoad} alt="loading..." className="w-50 h-50" />
          </div>
        </div>
      )}
        {!container.loading && !container.errorRequest && (
          <div
            className="bg-white"
          >
            {container.showDiv && (
              <div 
                data-testid='showDiv'
                className="fixed mt-28 lg:right-0 xl:right-0 mx-auto lg:w-1/2 xl:w-1/3 w-full">
                <PokemonCart
                  loading={container.loading}
                  errorRequest={container.errorRequest}
                  handleCloseDiv={container.handleCloseDiv}
                  cartValues={container.cartValues}
                  removeFromCart={container.removeFromCart}
                  handleQuantityChange={container.handleQuantityChange}                  
                />
              </div>

            )}
            <div
              className={`mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8 ${container.showDiv ? 'lg:ml-32 xl:ml-32' : ''}`}
            >
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8 justify-start">

                {container.filteredPokemons.map(pokemon => (

                  <div
                    className="flex flex-col items-center justify-center bg-blue-200 rounded-lg overflow-hidden"
                    key={pokemon.id}
                  >
                    <div
                      className="aspect-w-1 aspect-h-1 w-full">
                      <img
                        data-testid="open-dialog-pokemon"
                        src={pokemon?.imageUrl}
                        className="h-full w-full object-cover object-center group-hover:opacity-75 cursor-pointer"
                        alt={pokemon?.name}
                        onClick={() => container.handleOpenDialog(pokemon.id)}
                      />
                    </div>
                    <h3
                       data-testid='pokemon-name'
                      className="mt-2 text-lg font-bold text-center text-blue-700" >
                      {pokemon?.name.toUpperCase()}
                    </h3>
                    <p
                      data-testid='pokemon-weight'
                      className="mb-2 text-lg font-bold text-blue-700">
                      {((pokemon.weight + 13.99) / 5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p 
                      data-testid='cart-add'
                      onClick={(event) => container.addToCart(event, pokemon)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 mb-3 cursor-pointer text-blue-700"
                      >
                        <path
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </p>

                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {!container.loading && !container.errorRequest && (
          <Pagination 
            getPageNumbers={container.getPageNumbers}
            handlePreviousPage={container.handlePreviousPage}
            handleNextPage={container.handleNextPage}
            currentPage={container.currentPage}
            currentPokemons={container.currentPokemons}
            pokemonsPerPage={container.pokemonsPerPage}
            filteredPokemons={container.filteredPokemons}
            indexOfFirstPokemon={container.indexOfFirstPokemon}
            paginate={container.paginate}
          />
        )}
      </div>
      {container.errorRequest && container.showAlert && (
        <AlertMessage
          message={container.message}
          handleCloseAlert={container.handleCloseAlert} 
        />
      )}
        {!container.loading && message && container.showAlert && (
        <AlertMessageSuccess
          message={container.message}
          handleCloseAlert={container.handleCloseAlert} 
        />
      )}
      {container.openDialog && (
        <PokemonDetail
          handleCloseDialog={container.handleCloseDialog}
          handleOpenDialog={container.handleOpenDialog}
          loading={container.loading}
          errorRequest={container.errorRequest}
          filteredPokemons={container.filteredPokemons}
          pokemonState={container.pokemonState}
          showDataById={container.showDataById}
          addToCart={container.addToCart}
        />
      )}
    </>
  );
};