import axios from "axios";
import { Pokemon, PokemonDetail } from "../interface";

interface Result {
  next: string;
  list: PokemonDetail[];
}

export async function loadPokemons(url: string) {
  let result: Result = {
    next: "",
    list: [],
  };
  const res = await axios.get(url);
  const { next, results } = res.data;
  result.next = next;
  await Promise.all(
    results.map(async (p: Pokemon) => {
      const res = await axios.get(p.url);
      result.list.push(res.data);
    })
  );
  return result;
}
