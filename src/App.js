import { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";
import Load from "./components/Load/Load.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState(initialURL);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      loadPokemon(res.results);
      setNextURL(res.next);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    const _pokemon = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemon);
  };

  const handlePrevPage = async () => {
    // 前のページのポケモンデータを表示
    setLoading(true);
    const prevPokemonData = await getAllPokemon(prevURL);
    await loadPokemon(prevPokemonData.results);

    // 前の前のページのURLをセット
    setPrevURL(prevPokemonData.previous);

    // 次のページのURLをセット
    setNextURL(prevPokemonData.next);

    setLoading(false);
  };

  const handleNextPage = async () => {
    // 次のページのポケモンデータを表示
    setLoading(true);
    const newPokemonData = await getAllPokemon(nextURL);
    await loadPokemon(newPokemonData.results);

    // 次の次のページのURLをセット
    setNextURL(newPokemonData.next);

    // 前のページのURLをセット
    setPrevURL(newPokemonData.previous);

    setLoading(false);
  };

  const scrollOnTop = () => {
    window.scroll({top: 0, behavior: 'instant'});
  }

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <Load />
        ) : (
          <>
            <h1>ポケモンデータを取得しました</h1>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                i === 20 && setLoaded(true);
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            {Loaded && 
              <div className="btn">
                {prevURL !== initialURL && prevURL !== null && (<button onClick={()=> {handlePrevPage(); scrollOnTop();}}>前へ</button>)}
                {nextURL !== null && (<button onClick={()=> {handleNextPage(); scrollOnTop();}}>次へ</button>)}
              </div>
            }
          </>
        )}
      </div>
    </>
  );
}

export default App;
