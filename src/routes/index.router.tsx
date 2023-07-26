import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PokemonStore } from '../pages/PokemonStore/PokemonStore';
import { NotFound, PaypalCheckout } from '../componentes';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PokemonStore />} />
                <Route path="/home" element={<PokemonStore />} />
                <Route path="/checkout" element={<PaypalCheckout />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

