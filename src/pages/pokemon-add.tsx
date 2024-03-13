import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import PokemonForm from "../components/pokemon-form";

const PokemonAdd: FunctionComponent = () => {
  const [pokemon] = useState<Pokemon>(new Pokemon());

  return (
    <div className="custom-container">
      <h2>Ajouter un pokémon</h2>
      <div className="w-full">
        <PokemonForm pokemon={pokemon} isEditForm={false} />
      </div>
    </div>
  );
};

export default PokemonAdd;
