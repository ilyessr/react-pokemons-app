import React, { FunctionComponent, useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom"; // Importez le hook useParams
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";

import Loader from "../components/loader";
import { getPokemonById } from "../services/pokemonService";
import PageNotFound from "./page-not-found";

const PokemonEdit: FunctionComponent = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams<Params>();

  const fetchPokemon = async (id: number) => {

    try {
      const { data } = await getPokemonById(id);
      setPokemon(data);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      setIsLoading(true);
      fetchPokemon(parseInt(id)).finally(() => setIsLoading(false));
    }
  }, [id]);

  return (
    <div className="custom-container mx-auto max-w-lg">
      {isLoading ? <Loader /> : pokemon ? (
        <>
          <h2>
            Éditer {pokemon.name}
          </h2>
          <div className="w-full">
            <PokemonForm pokemon={pokemon} isEditForm={true} onFormSubmitSuccess={async () => id && await fetchPokemon(parseInt(id))} />
          </div>
        </>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default PokemonEdit;
