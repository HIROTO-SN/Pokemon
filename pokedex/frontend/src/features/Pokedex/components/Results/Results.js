/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { column12, push1 } from "../../../../components/CommonCss/Layout.js";
import { getPokemonList } from "../../../../components/api/PokemoApi.js";
import { useDispatchSearch, useSearchCondition } from "../../contexts/SearchContext.js";
import Alert from "./Alert.js";
import Load from "./Load.js";
import LoadMore from "./LoadMore.js";
import PokemonList from "./PokemonList.js";

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
  const search = useSearchCondition();
  const dipatch = useDispatchSearch();

  /***** JS ******/
  /**
  * 初期表示時処理
  * Pokemonリスト1～12を取得
  */
  useEffect(() => {
    const fetchPokemonData = async () => {
      // 初期表示用ポケモンリストを取得
      const res = await getPokemonList(search);
      console.log(res.data);
      console.log(res.data.length);
      loadPokemon(res.data, "init");
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  
  /**
  * Load more クリックイベント
  */  
 const clickedloadMorePokemon = async () => {
   // ローダーを表示
   setLoading(true);
   const nextTwelvePokemon = await getPokemonList(search);
   loadPokemon(nextTwelvePokemon.data, "more");
   // ローダーを再度非表示
   setLoading(false);
  };
  
  /**
  * @param {List} data - 取得したPokemonデータ
  * @param {String} type - Dispatchアクション名
  * PokemonリストのState更新関数
  */  
  const loadPokemon = (data, type) => {
    switch (type) {
      case "init": {
        setPokemonData(data);
        dipatch({ type: "nextPoke", val: data.length });
        break;
      }
      case "more": {
        const combinedPoekmonData = [...pokemonData, ...data];
        setPokemonData(combinedPoekmonData);
        dipatch({ type: "nextPoke", val: combinedPoekmonData.length } );
        break;
      }
    }
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
