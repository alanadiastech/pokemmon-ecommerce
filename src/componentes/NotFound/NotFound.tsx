import { Link, useLocation } from "react-router-dom";
import { PokemonStoreContainer } from "../../pages/PokemonStore/PokemonStoreContainer";

export const NotFound = () => {

    const { pathname } = useLocation();
    const container = PokemonStoreContainer();

    return (
        <>
            {!container.loading &&
                <div className="flex items-center justify-center h-screen flex-col">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/pokemmon-ecommerce.appspot.com/o/noteFound.png?alt=media&token=6ccd7f59-2e23-4aba-8f92-44052b4bb8a6"
                        alt="Página não encontrada. Tente novamente!"
                        className="object-contain h-auto max-h-52"
                    />
                    <Link
                        className="w-auto mt-5 text-lg font-boldinline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-200 sm:text-sm"
                        to={`${pathname.split('/').slice(0, -1).join('/')}/home`}
                    >
                        <h1>OU CLICK AQUI !!!</h1>
                    </Link>
                </div>}
        </>
    );

};