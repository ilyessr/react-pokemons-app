import React, { useState } from "react";
import Pokemon from "../models/pokemon";
import useFormValidation from "../hooks/useFormValidation";

import { AllPokemonTypes } from "../constante";
import TypeTag from "./pokemon-type";
import Modal from "./modal";
import { ModalContent, actionTypeModal } from "./ModalContent";
import { useNavigate } from "react-router-dom";

const PokemonForm: React.FC<{
  pokemon: Pokemon;
  isEditForm: boolean;
  onFormSubmitSuccess?: () => void;
}> = ({ pokemon, isEditForm, onFormSubmitSuccess }) => {
  const navigate = useNavigate();
  const isAddForm = !isEditForm;
  const [isModalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState<actionTypeModal>(
    isEditForm ? "modified" : "added"
  );
  const { form, handleInputChange, handleSubmit, errorServer } =
    useFormValidation(pokemon, isAddForm, () => {
      onFormSubmitSuccess && onFormSubmitSuccess();
      setActionType(isAddForm ? "added" : "modified");
      setModalVisible(true);
    });

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = e.target.checked;
    let newField = { ...form.types };
    if (checked) {
      newField.value.push(type);
    } else {
      newField.value = newField.value.filter((t: string) => t !== type);
    }
    handleInputChange({
      target: { name: "types", value: newField.value },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    console.log(actionType)
    actionType === "deleted" && navigate("/");
  };

  const handleDelete = () => {
    setActionType("confirmationSuppression");
    setModalVisible(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container flex flex-col h-full items-center mx-auto max-w-2xl px-4 py-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="w-full max-w-xl relative">
            {isEditForm && (
              <div className="flex justify-center items-center">
                <span
                  className="w-10 h-10 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full absolute top-3 right-3 -mt-4 -mr-4 flex justify-center items-center cursor-pointer"
                  onClick={handleDelete}
                >
                  <i className="material-icons">delete</i>
                </span>
                <img
                  src={form.picture.value}
                  alt={form.name.value}
                  className="w-64 h-64 object-cover rounded-full"
                />
              </div>
            )}

            <div>
              {isAddForm && (
                <div className="mb-4">
                  <label
                    htmlFor="picture"
                    className="block text-gray-700 font-bold mb-2"
                  >
                    Image
                  </label>
                  <input
                    id="picture"
                    type="text"
                    name="picture"
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={form.picture.value}
                    onChange={handleInputChange}
                  ></input>
                  <p className="text-gray-600 text-xs mt-1">
                    Remplacez "XXX" dans l'URL par un nombre à 3 chiffres correspondant au Pokémon.
                  </p>
                  {form.picture.error && (
                    <div className="text-red-500 text-sm mt-1">
                      {form.picture.error}
                    </div>
                  )}
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nom
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.name.value}
                  onChange={handleInputChange}
                ></input>
                {/* error */}
                {form.name.error && (
                  <div className="text-red-500 text-sm mt-1">
                    {form.name.error}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="hp"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Point de vie
                </label>
                <input
                  id="hp"
                  type="number"
                  name="hp"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.hp.value}
                  onChange={handleInputChange}
                ></input>
                {/* error */}
                {form.hp.error && (
                  <div className="text-red-500 text-sm mt-1">
                    {form.hp.error}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cp"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Dégâts
                </label>
                <input
                  id="cp"
                  type="number"
                  name="cp"
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={form.cp.value}
                  onChange={handleInputChange}
                ></input>
                {/* error */}
                {form.cp.error && (
                  <div className="text-red-500 text-sm mt-1">
                    {form.cp.error}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Types
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AllPokemonTypes.map((type, index) => (
                    <div key={type}>
                      <label className="mb-2 flex items-center">
                        <input
                          id={type}
                          type="checkbox"
                          name="types"
                          className="form-checkbox mr-3 h-4 w-4"
                          value={type}
                          checked={hasType(type)}
                          // disabled={!isAddForm}
                          onChange={(e) => selectType(type, e)}
                        ></input>
                        <TypeTag key={index} type={type} />
                      </label>
                    </div>
                  ))}
                </div>
                {/* error */}
                {form.types.error && (
                  <div className="text-red-500 text-sm mt-1">
                    {form.types.error}
                  </div>
                )}
              </div>
              <div className="text-center">
                {errorServer && (
                  <div className="text-red-500 text-sm mt-1">{errorServer}</div>
                )}
                {/* Submit button */}
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-10"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <ModalContent
          pokemon={pokemon}
          actionType={actionType}
          setActionType={setActionType}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
    </>
  );
};

export default PokemonForm;
