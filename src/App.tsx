import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { loadPokemons } from "./components/loadPokemons";
import "./components/pokemon.css";
import ViewDetail from "./components/ViewDetail";
import { Pokemon, PokemonDetail } from "./interface";

type Page = "list" | "detail";

const App: React.FC = () => {
  const [pokemonDetailList, setPokemonDetailList] = useState<PokemonDetail[]>([]);
  const [currentDetail, setcurrentDetail] = useState<PokemonDetail | null>(null);
  const [page, setPage] = useState<Page>("list");
  const [nextUrl, setNextUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon/");

  useEffect( () => {
    loadData()
  }, []);

  const handleClose = () => {
    setcurrentDetail(null);
    setPage("list");
  };

  const loadData = () => {
    loadPokemons(nextUrl).then(res => {
      setPokemonDetailList([...pokemonDetailList, ...res.list]);
      setNextUrl(res.next)
    })
  }

  function handleViewDetail(id: number) {
    const pokemon = pokemonDetailList.find((p) => p.id === id);
    console.log(pokemon);
    if (pokemon) {
      setcurrentDetail(pokemon);
      setPage("detail");
    } else {
      setcurrentDetail(null);
      setPage("list");
    }
  }

  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <div className={page==="list" ? "" : "hide"}>
          <ul className="collection-container">
            {pokemonDetailList.map((p: PokemonDetail) => (
              <li
                key={p.id}
                className="pokemon-list-container"
                onClick={() => {
                  handleViewDetail(p.id);
                }}
              >
                <p className="pokemon-name"> {p.name} </p>
                <img src={p.sprites.front_default} alt="pokemon"></img>
              </li>
            ))}
          </ul>
          <div className="btn" onClick={loadData}>
            <button>Load more</button>
          </div>
        </div>
        <ViewDetail item={currentDetail} click={handleClose} />
      </div>
    </div>
  );
};

export default App;
