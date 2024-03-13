import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePokemon } from '../services/pokemonService';
import Pokemon from '../models/pokemon';


export type actionTypeModal = 'added' | 'modified' | 'confirmationSuppression' | 'deleted' | null;


interface ModalContentProps {
    pokemon: Pokemon
    actionType: actionTypeModal;
    setActionType: (args: actionTypeModal) => void
    handleCloseModal: () => void;
}

export const ModalContent: FunctionComponent<ModalContentProps> = ({
    pokemon,
    actionType,
    setActionType,
    handleCloseModal,

}) => {

    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string>('');


    const handleDelete = async () => {
        if (pokemon.id) {
            setIsDeleting(true);
            try {
                await deletePokemon(pokemon.id);
                setActionType("deleted")

            } catch (error) {
                console.error('Erreur lors de la suppression du pokémon :', error);

                let errorMessage = 'Une erreur inconnue est survenue.';


                if (error instanceof Error) {
                    try {
                        const errorObject = JSON.parse(error.message);
                        if (errorObject.message) {
                            errorMessage = errorObject.message;
                            setError(errorMessage)
                        }
                    } catch (parseError) {
                        errorMessage = error.message;
                        setError(errorMessage)
                    }
                }
            } finally {
                setIsDeleting(false);
            }
        }
    };


    switch (actionType) {
        case 'added':
        case 'modified':
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Opération réussie !</h3>
                    <p className="text-gray-600">Le pokémon a bien été {actionType === "added" ? "ajouté" : "modifié"}.</p>
                    <div className="mt-6">
                        <Link to="/" onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Retour à l'accueil</Link>
                    </div>
                </div>
            );
        case 'confirmationSuppression':
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Êtes-vous sûr ?</h3>
                    <p className="text-gray-600">
                        Cette action est irréversible et supprimera définitivement le pokémon.
                    </p>
                    <div className="text-red-500 text-sm mt-1">{error}</div>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:bg-red-300"
                            aria-label="Supprimer le Pokémon"
                        >
                            {isDeleting ? 'Suppression...' : 'Supprimer'}
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                            aria-label="Annuler la suppression"
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            );
        case 'deleted':
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Opération réussie !</h3>
                    <p className="text-gray-600">Le pokémon a bien été supprimé.</p>
                    <div className="mt-6" onClick={() => setActionType(null)}>
                        <Link to="/" onClick={handleCloseModal} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Retour à l'accueil</Link>
                    </div>
                </div>
            );
        default:
            return null;
    }
};
