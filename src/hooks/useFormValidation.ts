import { useState } from "react";
import Pokemon from "../models/pokemon";
import {
  validateUrl,
  validateName,
  validateHp,
  validateCp,
  validateTypes,
} from "../helpers/validators";
import { createPokemon, updatePokemon } from "../services/pokemonService";

type Field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type Form = {
  picture: Field;
  name: Field;
  hp: Field;
  cp: Field;
  types: Field;
};

const useFormValidation = (
  pokemon: Pokemon,
  isAddForm: boolean,
  onFormSubmitSuccess: () => void
) => {
  const [errorServer, setServerError] = useState<string>();
  const [form, setForm] = useState<Form>({
    picture: { value: pokemon.picture, isValid: false },
    name: { value: pokemon.name, isValid: false },
    hp: { value: pokemon.hp, isValid: false },
    cp: { value: pokemon.cp, isValid: false },
    types: { value: pokemon.types, isValid: false },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: Field = { [fieldName]: { value: fieldValue } };

    setForm({ ...form, ...newField });
  };

  const validateField = (
    fieldName: keyof Form,
    validator: (value: any) => boolean,
    currentForm: Form
  ): Form => {
    const validationMessages = {
      picture: "L'URL doit commencer par https:// et se terminer par .png.",
      name: "Le nom doit uniquement contenir des lettres et des espaces, et être long de 3 à 25 caractères.",
      hp: "Les points de vie doivent être un nombre entre 0 et 999.",
      cp: "Les dégâts doivent être un nombre entre 0 et 99.",
      types:
        "L'URL fournie ne correspond pas au schéma attendu pour les images Pokémon.",
    };

    const value = currentForm[fieldName].value;
    const isValid = validator(value);
    const errorMsg = isValid ? "" : validationMessages[fieldName];

    return {
      ...currentForm,
      [fieldName]: { ...currentForm[fieldName], isValid, error: errorMsg },
    };
  };

  const validateForm = () => {
    let newForm: Form = form;

    newForm = validateField("picture", validateUrl, newForm);
    newForm = validateField("name", validateName, newForm);
    newForm = validateField("hp", validateHp, newForm);
    newForm = validateField("cp", validateCp, newForm);
    newForm = validateField("types", validateTypes, newForm);

    setForm(newForm);
    return Object.values(newForm).every((field) => {
      return field.isValid;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      const newPokemon = {
        ...pokemon,
        picture: form.picture.value,
        name: form.name.value,
        hp: form.hp.value,
        cp: form.cp.value,
        types: form.types.value,
      };

      try {
        if (isAddForm) {
          await createPokemon(newPokemon);
        } else {
          await updatePokemon(newPokemon);
        }
        onFormSubmitSuccess();
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire:", error);
        setServerError("Erreur lors de la soumission du formulaire");
      }
    }
  };

  return { form, handleInputChange, handleSubmit, errorServer };
};

export default useFormValidation;
