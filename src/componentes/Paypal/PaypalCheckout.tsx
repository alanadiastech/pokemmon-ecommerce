import { Link, useLocation } from 'react-router-dom';
import { PaypalCheckoutButton } from '../../pages/Paypal';
import { PokemonStoreContainer } from '../../pages/PokemonStore/PokemonStoreContainer';
import pokeLoad from "/src/assets/butterfree.gif";

export const PaypalCheckout = () => {
  const container = PokemonStoreContainer();
  const { pathname } = useLocation();

  return (
    <div className="p-5 rounded-md text-blue-700 flex flex-col items-center">
      <img src={pokeLoad} alt="loading..." className="w-50 h-50 mb-5" />
      <h1 className="mb-5 text-center text-2xl font-black">PayPal Checkout</h1>
      <div>
        <h2 className="font-bold text-lg text-center mb-5">
          R${container.cartValues?.total.toFixed(2)}
        </h2>
      </div>
      <div className="w-full flex justify-center">
        <PaypalCheckoutButton
          cartValues={container.cartValues}
          message={container.message}
          handleCloseAlert={container.handleCloseAlert}
        />
      </div>
      <h3 className="text-lg mb-5 items-center flex flex-col">
        Adicionar mais Pokémons ...
      </h3>
      <Link
        to={`${pathname.split('/').slice(0, -2).join('/')}/home`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 mb-3 cursor-pointer"
        >
          <path
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </Link>
    </div>
  );
};