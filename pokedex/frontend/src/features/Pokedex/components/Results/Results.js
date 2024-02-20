/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { column12, push1 } from "../../../../components/CommonCss/Layout.js";
import { getAllPokemon, getAllPokemonList, getPokemon, getPokemonImages } from "../../../../components/api/PokemoApi.js";
import Alert from "./Alert.js";
import Load from "./Load.js";
import LoadMore from "./LoadMore.js";
import PokemonList from "./PokemonList.js";
import { useDispatchSearch } from "../../contexts/SearchContext.js";

const Results = () => {
  /***** CSS ******/
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

   /***** Definition ******/
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const dipatch = useDispatchSearch();
  const [nextURL, setNextURL] = useState("");

  /***** JS ******/
  /**
  * 初期表示時処理
  * Pokemonリスト1～20を取得
  */
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      // let res = await getAllPokemon(pokemonExternalApiUrl);
      // console.log(res);
      // loadPokemon(res.results, "init");
      // setLoading(false);
      // setNextURL(res.next);

      // ここから新しい処理
      const res = await getAllPokemonList();
      console.log("res.data ===========");
      console.log(res.data);
      loadPokemon(res.data, "init");
      setLoading(false);
      console.log(res.data.length);
    };
    fetchPokemonData();
  }, []);


  /**
  * @param {List} data - 取得したPokemonデータ
  * PokemonリストのState更新関数
  */  
  const loadPokemon = async (data, type) => {
    switch (type) {
      case "init": {
        setPokemonData(data);
        dipatch("nextPoke", data.length);
        break;
      }
      case "more": {
        const combinedPoekmonData = [...pokemonData, ...data];
        setPokemonData(combinedPoekmonData);
        dipatch("nextPoke", combinedPoekmonData.length);
        break;
      }
    }
  };

  // const loadPokemon = async (data, type) => {
  //   const _pokemon = await Promise.all(
  //     data.map((pokemon) => {
  //       const pokemonRecord = getPokemon(pokemon.url);
  //       return pokemonRecord;
  //     })
  //   );
  //   switch (type) {
  //     case "init": {
  //       setPokemonData(_pokemon);
  //       break;
  //     }
  //     case "more": {
  //       const combinedPoekmonData = [...pokemonData, ..._pokemon];
  //       setPokemonData(combinedPoekmonData);
  //       break;
  //     }
  //   }
  // };

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

  /***** HTML ******/
  return (
    <section id="result" css={results}>
      <ul css={resultsList}>
        {pokemonData.map((pokemon, i) => {
          return <PokemonList key={i} pokemon={pokemon} />;
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
