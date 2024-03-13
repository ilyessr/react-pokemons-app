import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

const PageNotFound: FunctionComponent = () => {
  return (
    <div className="custom-container flex flex-col items-center justify-center h-screen">
      <img
        src="http://assets.pokemon.com/assets/cms2/img/pokedex/full/035.png"
        alt="Page non trouvée"
        className="w-32 h-32 mb-4"
      />
      <h1 className="text-3xl font-bold mb-4 text-center">
        Hey, cette page n'existe pas !
      </h1>
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default PageNotFound;
