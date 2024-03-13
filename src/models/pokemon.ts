import { PokemonType } from "../types/types";

export default class Pokemon {
  id?: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: PokemonType[];
  created: Date;

  constructor(
    hp: number = 100,
    cp: number = 10,
    name: string = "",
    picture: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png",
    types: PokemonType[] = ["Normal"],
    created: Date = new Date(),
    id?: number
  ) {
    if (id) this.id = id;
    this.hp = hp;
    this.cp = cp;
    this.name = name;
    this.picture = picture;
    this.types = types;
    this.created = created;
  }
}
