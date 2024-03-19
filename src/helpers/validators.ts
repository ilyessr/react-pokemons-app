// validators.ts

import { AllPokemonTypes } from "../constante";
import { PokemonType } from "../types/types";

export const validateUrl = (url: string): boolean => {
  const regex =
    /^https:\/\/assets\.pokemon\.com\/assets\/cms2\/img\/pokedex\/detail\/(\d+)\.png$/;
  const match = url.match(regex);

  if (!match) {
    return false;
  }

  const dexNumber = parseInt(match[1], 10);
  return dexNumber >= 1 && dexNumber <= 1025;
};

export const validateName = (name: string): boolean => {
  return /^[a-zA-Zàéè ]{3,25}$/.test(name);
};

export const validateHp = (hp: string): boolean => {
  return /^[0-9]{1,3}$/.test(hp);
};

export const validateCp = (cp: string): boolean => {
  return /^[0-9]{1,2}$/.test(cp);
};

export const validateTypes = (types: PokemonType[]): boolean => {
  if (types.length === 0) {
    return false;
  }

  if (types.length > 3) {
    return false;
  }

  const containsSpecifiedType = types.every((type) =>
    AllPokemonTypes.includes(type)
  );

  if (!containsSpecifiedType) {
    return false;
  }

  return true;
};
