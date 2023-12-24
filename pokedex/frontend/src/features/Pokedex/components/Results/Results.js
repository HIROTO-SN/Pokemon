/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { push1, column12 } from "../../../../components/CommonCss/Layout.js";
import Alert from "./Alert.js";
import LoadMore from "./LoadMore.js";
import PokemonList from "./PokemonList.js";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "../../../../utils/PokemoApi.js";
import { pokemonAcessApiUrl } from "../../types/AcessTypes.js";
import Load from "./Load.js";

const Results = () => {
  const results = css`
    overflow: visible;
    position: relative;
    height: auto;
    padding: 1em 0;
    background: transparent url("/background/content_bg.png") left top;
    background-size: 100% 1px;
    display: block;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1024px;
    width: 100%;

    :before {
      content: "";
      display: table;
    }
    :after {
      clear: both;
      content: "";
      display: table;
    }
  `;

  const resultsList = css`
    height: auto;
    float: left;
    margin-right: -100%;
    width: 85.49%;
    margin-left: 7.2525%;
    list-style: none;
  `;

  const noResults = css`
    display: none;
  `;

  const contentBlock = css`
    clear: both;
    display: block;
    width: 100%;
    float: left;
    margin: 1em 0 0 0;
    position: relative;
  `;

  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(pokemonAcessApiUrl);
      loadPokemon(res.results, "init");
      setLoading(false);
      setNextURL(res.next);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data, type) => {
    const _pokemon = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    switch (type) {
      case "init": {
        setPokemonData(_pokemon);
        break;
      }
      case "more": {
        const combinedPoekmonData = [...pokemonData, ..._pokemon];
        setPokemonData(combinedPoekmonData);
        break;
      }
    }
  };

  const clickedloadMorePokemon = async () => {
    // ローダーを表示
    setLoading(true);
    const nextTwentyPokemonData = await getAllPokemon(nextURL);
    await loadPokemon(nextTwentyPokemonData.results, "more");

    // 次のページのURLをセット
    setNextURL(nextTwentyPokemonData.next);
    // ローダーを再度非表示
    setLoading(false);
  };

  return (
    <section css={results}>
      <ul css={resultsList}>
        {pokemonData.map((pokemon, i) => {
          return <PokemonList key={i} number={i} pokemon={pokemon} />;
        })}
      </ul>
      <div css={[push1, column12, noResults]}>
        <Alert />
      </div>
      <div css={contentBlock}>
        {loading && <Load />}
        <LoadMore clickedloadMorePokemon={clickedloadMorePokemon} />
      </div>
    </section>
  );
};

export default Results;
