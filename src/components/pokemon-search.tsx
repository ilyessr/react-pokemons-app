import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import { getPokemons } from "../services/pokemonService";

interface PokemonSearchProps {
  setFilteredPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const PokemonSearch: FunctionComponent<PokemonSearchProps> = ({ setFilteredPokemons }) => {
  const [term, setTerm] = useState<string>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
    getPokemons(term.length >= 2 ? term : undefined).then(({ data }) => setFilteredPokemons(data));
  };

  return (
    <div className="mb-4 w-full max-w-xl">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
        Rechercher un pokémon
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="search"
        type="text"
        placeholder="Entrez le nom d'un pokémon"
        value={term}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default PokemonSearch;
