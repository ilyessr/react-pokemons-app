import React, { FunctionComponent, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatDate from "../helpers/format-date";

import Loader from "../components/loader";
import { getPokemonById } from "../services/pokemonService";
import TypeTag from "../components/pokemon-type";
import PageNotFound from "./page-not-found";

const PokemonsDetail: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id !== undefined) {
      const fetchPokemon = async () => {
        setIsLoading(true);
        try {
          const { data } = await getPokemonById(parseInt(id));
          setPokemon(data);
        } catch (error) {
          console.error("Error fetching Pokemon:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPokemon();
    }
  }, [id]);


  return (
    <div className="custom-container max-w-lg">
      {isLoading ? <Loader /> : pokemon ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
          <div className="flex items-center justify-center relative">
            <img
              src={pokemon.picture}
              alt={pokemon.name}
              className="object-cover"
            />
            <Link
              to={`/pokemons/edit/${pokemon.id}`}
              className="w-10 h-10 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full absolute top-3 right-3 -mt-4 -mr-4 flex justify-center items-center"
            >
              <i className="material-icons">edit</i>
            </Link>
          </div>
          <div >
            <h2>{pokemon.name}</h2>
            <table className="border-collapse w-full">
              <tbody>
                <tr className="bg-gray-100">
                  <td className="font-semibold p-2">Types</td>
                  <td>
                    {pokemon.types.map((type, index) => (
                      <TypeTag key={index} type={type} />
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold p-2">Points de vie</td>
                  <td>{pokemon.hp}</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="font-semibold p-2">Dégâts</td>
                  <td>{pokemon.cp}</td>
                </tr>

                <tr>
                  <td className="font-semibold p-2">Date de création</td>
                  <td>{formatDate(new Date(pokemon.created))}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default PokemonsDetail;
