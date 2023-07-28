import { useEffect, useState } from "react";
import { PokemonDetail, PokemonStoreContainerType } from "../../interfaces/Pokemon";
import api from "../../services/api";
import { Cart } from "../../interfaces/Cart";
import { useNavigate } from "react-router-dom";

export const PokemonStoreContainer = (): PokemonStoreContainerType => {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(16);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorRequest, setErrorRequest] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageSearch, setMessageSearch] = useState<string>('');
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  const pokemonState = {} as PokemonDetail;
  const [showAlert, setShowAlert] = useState(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showDataById, setShowDataById] = useState<number>(0);
  const [cartValues, setCartValues] = useState<Cart>({ pokeValues: [], total: 0 }); // Estado para controlar os valores do carrinho
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setShowAlert(false);
    setMessage('');
    navigate('/');
    setMessageSearch('')
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);


  useEffect(() => {
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    if (search === '') {
      const slicedPokemons = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
      setFilteredPokemons(slicedPokemons);
    } else {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemons(filtered);
    }
  }, [search, currentPage, pokemons, pokemonsPerPage]);

  useEffect(() => {
    if (filteredPokemons.length === 0) {
      setMessageSearch('Nenhum Pokémon encontrado. Pesquise outro nome!');
      setErrorRequest(true);
      setErrorRequest(false)
    } else {
      setMessageSearch('');
      setErrorRequest(false);
    }
  }, [filteredPokemons]);


  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.floor(maxVisiblePages / 2)) {
      endPage = maxVisiblePages;
    } else if (currentPage + Math.floor(maxVisiblePages / 2) >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (filteredPokemons.length === pokemonsPerPage) {
      paginate(currentPage + 1);
    }
  };

  const getPokemons = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/pokemon?limit=300`);

      const pokemonsWithImages = await Promise.all(
        response.data.results.map(async (pokemon: PokemonDetail) => {
          const pokemonData = await api.get(`/pokemon/${pokemon.name}`);
          return {
            ...pokemon,
            imageUrl: pokemonData.data.sprites?.other['official-artwork']?.front_default || '',
            id: pokemonData.data.id || '',
            name: pokemonData.data.species?.name || '',
            height: pokemonData.data.height || '',
            types: pokemonData.data.types || '',
            weight: pokemonData.data.weight || '',
            stats: pokemonData.data.stats || ''
          };
        })
      );
      setPokemons(pokemonsWithImages);
      setLoading(false);
    } catch (error) {
      setMessage('Pokémons não encontrados, tente novamente.');
      setLoading(false);
      setErrorRequest(true);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (pokemonId: number): void => {
    setOpenDialog(true);
    setShowDataById(pokemonId);
  };

  const handleOpenDiv = () => {
    setShowDiv(true);
  };

  const handleCloseDiv = () => {
    setShowDiv(false);
  };

  const addToCart = (event: React.MouseEvent<HTMLElement>, pokemon: PokemonDetail) => {
    event.preventDefault();
    let pokeValues;
    let newItem = true;

    if (!cartValues) pokeValues = [{ pokemon: pokemon, qtd: 0, total: 0 }];
    else pokeValues = cartValues.pokeValues;

    pokeValues.forEach((pokevalue) => {
      if (pokevalue.pokemon.id === pokemon.id) {
        newItem = false;
        pokevalue.qtd++;
        pokevalue.total = ((pokevalue.pokemon.weight + 13.99) / 5) * pokevalue.qtd
      }
    });

    if (newItem)
      pokeValues.push({
        pokemon,
        qtd: 1,
        total: (pokemon.weight + 13.99) / 5,
      });

    const total: number = pokeValues.reduce((prev, cur) => {
      return prev + cur.total;
    }, 0);

    setCartValues({ pokeValues, total });
    setTotalQuantity(calculateTotalQuantity(pokeValues));
    localStorage.setItem('cartValues', JSON.stringify({ pokeValues, total }));
  };

  const removeFromCart = async (pokemon: PokemonDetail) => {
    if (cartValues) {
      let pokeValues = cartValues.pokeValues;
      pokeValues.forEach((pokevalue) => {
        if (pokevalue.pokemon.name === pokemon.name) {
          pokevalue.qtd--;
          pokevalue.total = ((pokevalue.pokemon.weight + 13.99) / 5) * pokevalue.qtd;
        }
      });
      pokeValues = pokeValues.filter((pokevalue) => pokevalue.qtd !== 0);
      const total: number = pokeValues.reduce((prev, cur) => {
        return prev + cur.total;
      }, 0);

      setCartValues({ pokeValues, total });
      setTotalQuantity(calculateTotalQuantity(pokeValues));

      localStorage.setItem('cartValues', JSON.stringify({ pokeValues, total }));
    }
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, pokemon: PokemonDetail) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      const pokeValues = cartValues.pokeValues.map((pokevalue) => {
        if (pokevalue.pokemon.name === pokemon.name) {
          pokevalue.qtd = newQuantity;
          pokevalue.total = ((pokevalue.pokemon.weight + 13.99) / 5) * newQuantity;
        }
        return pokevalue;
      });

      const total: number = pokeValues.reduce((prev, cur) => {
        return prev + cur.total;
      }, 0);

      setCartValues({ pokeValues, total });
      setTotalQuantity(calculateTotalQuantity(pokeValues));
      localStorage.setItem('cartValues', JSON.stringify({ pokeValues, total }));

    } else {
      removeFromCart(pokemon)
    };
  };

  const calculateTotalQuantity = (pokeValues: any[]) => {
    let totalQuantity = 0;
    pokeValues.forEach((pokevalue) => {
      totalQuantity += pokevalue.qtd;
    });
    return totalQuantity;
  };

  useEffect(() => {
    const savedCartValues = localStorage.getItem('cartValues');
    if (savedCartValues) {
      const { pokeValues, total } = JSON.parse(savedCartValues);
      setCartValues({ pokeValues, total });
      setTotalQuantity(calculateTotalQuantity(pokeValues));
    }
  }, []);

  const container: PokemonStoreContainerType = {
    pokemons,
    getPageNumbers,
    handlePreviousPage,
    handleNextPage,
    filteredPokemons,
    indexOfFirstPokemon,
    pokemonState,
    currentPage,
    currentPokemons,
    pokemonsPerPage,
    paginate,
    search,
    setSearch,
    loading,
    errorRequest,
    message,
    showAlert,
    handleCloseAlert,
    handleOpenDialog,
    handleCloseDialog,
    openDialog,
    showDataById,
    showDiv,
    handleOpenDiv,
    handleCloseDiv,
    addToCart,
    cartValues,
    removeFromCart,
    handleQuantityChange,
    totalQuantity,
    messageSearch
  };

  return container;
};