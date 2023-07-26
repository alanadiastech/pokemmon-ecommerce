import { Link, useLocation } from "react-router-dom";
import { PokemonCartProps } from "../../interfaces"

export const PokemonCart = (props: PokemonCartProps) => {
    const { pathname } = useLocation();

    return (
        <>
            {!props.loading && !props.errorRequest && (
                <div className="pt-3 bg-blue-700 rounded-md mx-5">
                    <h1 className="mb-5 text-blue-200 text-center lg:text-2xl xl:text-2l text-sm font-black">Carrinho</h1>
                    <div className="overflow-auto lg:max-h-96 w-full">
                        {props.cartValues!.pokeValues.length > 0 ? (
                            <table className="w-full bg-blue-200">
                                <thead className="bg-blue-200">
                                    <tr className="text-sm text-center">
                                        <th></th>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                        <th>Valor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-blue-200">
                                    {props.cartValues?.pokeValues.map((poke) => (
                                        <tr key={poke.pokemon.id}>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap w-auto">
                                                <img
                                                    src={poke.pokemon.imageUrl}
                                                    alt={poke.pokemon.name}
                                                    className="rounded-t-lg object-contain lg:h-full lg:w-full xl:w-24 xl:h-24 sm:h-full sm:w-full md:h-48 md:w-32 md:rounded-none md:rounded-l-lg md:flex "
                                                />
                                            </td>
                                            <td className="p-3 text-xs text-gray-700 whitespace-nowrap text-center">
                                                {poke.pokemon.name}
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                                <input
                                                    style={{
                                                        width: "50%", margin: "auto"
                                                    }}
                                                    className="placeholder:italic placeholder:text-slate-400 block bg-white  border border-yellow-100 rounded-md py-2 pl-1 sm:pl-10 sm:pr-2 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1"
                                                    type="number"
                                                    name="qtd"
                                                    min={1}
                                                    value={poke.qtd}
                                                    onChange={(e) => props.handleQuantityChange(e, poke.pokemon)}
                                                />
                                            </td>
                                            <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">
                                                {poke.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </td>
                                            <td onClick={() => props.removeFromCart(poke.pokemon)}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-6 h-6 cursor-pointer"
                                                >
                                                    <path d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-blue-200">
                                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-end" colSpan={4}>
                                            <span className="font-bold">Total</span> {props.cartValues?.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <span className="font-bold text-lg text-white flex justify-center mb-3">Carrinho sem Pokémons</span>
                        )}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center rounded-b-md ">
                        {props.cartValues!.pokeValues.length > 0 ? (
                            <>
                                <Link
                                    className="w-full mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-200 sm:text-sm"
                                    to={`${pathname.split('/').slice(0, -1).join('/')}/checkout`}
                                >
                                    <button
                                        type="button"
                                    >
                                        Comprar
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    className="w-full mt-3 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-200 sm:text-sm"
                                    onClick={props.handleCloseDiv}
                                >
                                    Fechar
                                </button>

                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-500 text-base font-medium text-white hover:gray-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-200 sm:text-sm"
                                    onClick={props.handleCloseDiv}
                                >
                                    Fechar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};