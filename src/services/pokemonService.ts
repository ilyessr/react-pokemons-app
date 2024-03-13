import Pokemon from "../models/pokemon";
import sendRequest, { ApiResponse } from "./utils/httpRequest";

export function createPokemon(
  pokemonData: Pokemon
): Promise<ApiResponse<Pokemon>> {
  return sendRequest<Pokemon>("/pokemons", {
    method: "POST",
    body: JSON.stringify(pokemonData),
  });
}

export function getPokemons(
  searchTerm?: string | null
): Promise<ApiResponse<Pokemon[]>> {
  const url = searchTerm ? `/pokemons?name=${searchTerm}` : "/pokemons";
  return sendRequest<Pokemon[]>(url);
}

export function getPokemonById(id: number): Promise<ApiResponse<Pokemon>> {
  return sendRequest<Pokemon>(`/pokemons/${id}`);
}

export function updatePokemon(
  pokemonData: Partial<Pokemon>
): Promise<ApiResponse<Pokemon>> {
  return sendRequest<Pokemon>(`/pokemons/${pokemonData.id}`, {
    method: "PUT",
    body: JSON.stringify(pokemonData),
  });
}

export function deletePokemon(
  id: number
): Promise<ApiResponse<null | Pokemon>> {
  return sendRequest<null | Pokemon>(`/pokemons/${id}`, { method: "DELETE" });
}

export function resetDB(): Promise<ApiResponse<null | Pokemon>> {
  return sendRequest<null>(`/reset-db/`, { method: "POST" });
}
