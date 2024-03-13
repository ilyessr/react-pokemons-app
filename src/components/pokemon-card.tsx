import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Pokemon from "../models/pokemon";
import formatDate from "../helpers/format-date";
import TypeTag from "./pokemon-type";


type Props = {
  pokemon: Pokemon;
};

const PokemonCard: FunctionComponent<Props> = ({
  pokemon,
}) => {
  const navigate = useNavigate();

  const goToPokemon = (id: number) => {
    navigate(`/pokemons/${id}`);
  };

  return (

    <div
      className={`w-full  max-[700px]:justify-around justify-between flex p-4 border-2 border-solid rounded-lg cursor-pointer transition-colors duration-300 hover:border-red-400 bg-white hover:bg-red-100`}
      onClick={() => pokemon.id && goToPokemon(pokemon.id)}
    >
      <div className="min-h-32 h-32 flex relative">
        <img src={pokemon.picture} alt={pokemon.name} className="object-contain" />
      </div>
      <div className="mt-4">
        <div>
          <p className="text-lg font-bold">{pokemon.name}</p>
          <p className="text-sm text-gray-600">{formatDate(new Date(pokemon.created))}</p>
        </div>
        <div className="mt-2">
          {pokemon.types.map((type, index) => {
            return (
              <TypeTag key={index} type={type} />
            )
          })}
        </div>
      </div>
    </div>

  );
};

export default PokemonCard;
