import React from "react"
import { PokemonDetailProps } from "../../interfaces"

export const PokemonDetail = (props: PokemonDetailProps) => {

    return (
        <>
            <div className="fixed z-10 inset-0 overflow-y-auto font-poppins">
                <div className="flex items-center justify-center min-h-screen text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-screen-lg sm:w-full h-auto p-5">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                            {props.filteredPokemons.map((pokemon, index) => (
                                <React.Fragment key={index}>

                                    {props.showDataById && pokemon.id === props.showDataById && (
                                        <div
                                            className="flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 max-w-screen-lg md:flex-row"
                                            key={pokemon.id}
                                        >
                                            <img
                                                className="mb-5 h-full w-full rounded-t-lg object-contain md:h-80 md:w-80 md:rounded-none md:rounded-l-lg"
                                                src={pokemon.imageUrl}
                                                alt={pokemon.name}
                                            />
                                            <div className="flex flex-col p-6">
                                                <h3 className="mb-2 text-xl font-bold text-blue-900 dark:text-blue-50 text-center">
                                                    {pokemon.name.toUpperCase()}

                                                </h3>
                                                <div className="mb-3 text-xl text-center text-blue-900 dark:text-neutral-300 list-none">
                                                    <span
                                                        className="font-bold">
                                                        {((pokemon.weight + 13.99) / 5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                    </span>
                                                </div>
                                                <div className="text-xl text-blue-900 dark:text-neutral-300 list-none">
                                                    <span className="font-bold">Tipos: </span>
                                                    {pokemon.types && pokemon.types.map(({ type }, index) => (
                                                        <React.Fragment key={type.name}>
                                                            {index > 0 && ', '}
                                                            <span>{type.name}</span>
                                                        </React.Fragment>
                                                    ))}
                                                </div>

                                                <div className="text-xl text-blue-900 dark:text-neutral-300 list-none">
                                                    <span className="font-bold">Estatística Básica: </span>
                                                    {pokemon.stats && pokemon.stats.map((stat, index) => (
                                                        <React.Fragment key={stat.stat.name}>
                                                            {index > 0 && ', '}
                                                            <span>{stat.base_stat}</span>
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                                <div className="mb-5 text-xl text-blue-900 dark:text-neutral-300 list-none">
                                                    <span className="font-bold">Estatística: </span>
                                                    {pokemon.stats && pokemon.stats.map((stat, index) => (
                                                        <React.Fragment key={stat.stat.name}>
                                                            {index > 0 && ', '}
                                                            <span>{stat.stat.name}</span>
                                                        </React.Fragment>
                                                    ))}
                                                </div>

                                                <div className="text-xl text-blue-900 dark:text-neutral-300 list-none">
                                                    <span className="font-bold">Peso: </span>
                                                    <span>{pokemon.weight}</span>
                                                </div>

                                                <div className="text-xl text-blue-900 dark:text-neutral-300 list-none">
                                                    <span className="font-bold">Altura: </span>
                                                    <span>{pokemon.height}</span>
                                                </div>
                                            </div>
                                            <>
                                                <div className="bg-gray-50 mt-5 right-2 left-0 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center fixed w-full bottom-5 pt-3 ">
                                                    <button
                                                        type="button"
                                                        className="w-full mb-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-200 sm:text-sm"
                                                        onClick={(e) => props.addToCart(e, pokemon)}
                                                    >
                                                        Comprar
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="w-full mb-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-200 sm:text-sm"
                                                        onClick={props.handleCloseDialog}
                                                    >
                                                        Fechar
                                                    </button>
                                                </div>
                                            </>
                                        </div >
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};