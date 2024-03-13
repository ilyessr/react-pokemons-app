import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import PokemonCard from "../components/pokemon-card";
import { Link } from "react-router-dom";
import PokemonSearch from "../components/pokemon-search";
import { getPokemons, resetDB } from "../services/pokemonService";
import Loader from "../components/loader";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [reset, setReset] = useState<boolean>(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setIsLoading(true);
        const { data } = await getPokemons();
        setPokemons(data);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      } finally {
        setIsLoading(false);
        setReset(false)
      }
    };
    fetchPokemons();
  }, [reset]);


  const handleReset = async () => {
    try {
      await resetDB();
      setReset(true)
    } catch (error) {
      setError("Erreur lors de la réinitialisation de la base de données")


    }
  }


  return (
    <div className="custom-container">
      <h1 className="text-6xl font-bold text-center mb-10">Pokédex</h1>
      <div className="h-full w-full grow flex flex-col items-center ">
        <PokemonSearch setFilteredPokemons={setPokemons} />
        {isLoading ? (
          <Loader />
        ) : pokemons.length === 0 ? (
          <div className="mt-8">Aucun Pokémon trouvé.</div>
        ) : (
          <div className="grid w-full  min-[1400px]:grid-cols-4 grid-cols-1 min-[700px]:grid-cols-2 min-[1000px]:grid-cols-3 xl: gap-6 my-4">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
      <Link
        to="/pokemon/add"
        className="w-14 h-14 flex justify-center items-center fixed bottom-5 right-5 bg-red-500 hover:bg-red-700 text-white py-3 px-6 rounded-full shadow-lg"
      >
        <i className="material-icons">add</i>
      </Link>

      <div className="text-red-500 text-sm mt-1">{error}</div>
      <button
        onClick={handleReset}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        aria-label="Réinitialiser la base de données"
      >
        Réinitialiser la base de données
      </button>
    </div>
  );
};

export default PokemonList;

