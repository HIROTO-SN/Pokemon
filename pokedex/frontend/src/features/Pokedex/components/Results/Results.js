/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { clearTable, column12, push1 } from "../../../../components/CommonCss/Layout.js";
import { getPokemonList } from "../../../../components/api/PokemoApi.js";
import { useSetLoadFlg } from "../../../../contexts/LoadContext.js";
import {
  useLoader,
  usePokemonData,
  useSearchCondition,
  useSearchDispatch,
  useSetLoader,
  useSetPokemonData,
} from "../../contexts/SearchContext.js";
import { getPokeIdList } from "../../utils/PokeCommmonFunc.js";
import Alert from "./Alert.js";
import Load from "./Load.js";
import LoadMore from "./LoadMore.js";
import PokemonList from "./PokemonList.js";
import { isStrEmptyOrNull } from "../../../../components/CommonFunc/Common.js";

const Results = ( { passedState } ) => {
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
  `;

  const resultsList = css`
    height: auto;
    float: left;
    margin-right: -100%;
    width: 85.49%;
    margin-left: 7.2525%;
    list-style: none;
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
  const setloadFlg = useSetLoadFlg();
  const loader = useLoader();
  const setLoader = useSetLoader();
  const pokemonData = usePokemonData();
  const setPokemonData = useSetPokemonData();
  const search = useSearchCondition();
  const searchDipatch = useSearchDispatch();

  /***** JS ******/
  /**
   * 初期表示時処理
   * Pokemonリスト1～12を取得
   */
  useEffect(() => {
    setloadFlg(true);
    const fetchPokemonData = async () => {
      if (!isStrEmptyOrNull(passedState)) {
        let newSearch;
        if (passedState.action === "type") {
          newSearch = {...search, types: [passedState.type_id], actionType: "search"};
          searchDipatch({ type: "checkType", val: [passedState.type_id] });
        } else if (passedState.action === "weak") {
          newSearch = {...search, weaks: [passedState.type_id], actionType: "search"};
          searchDipatch({ type: "checkWeak", val: [passedState.type_id] });
        }
        const res = await getPokemonList(newSearch);
        loadPokemon(res.data.pokemonList, "init");
      } else {
        // 初期表示用ポケモンリストを取得
        const res = await getPokemonList(search);
        loadPokemon(res.data.pokemonList, "init");
      }
      setLoader(false);
    };
    const timer = setTimeout(() => {
      fetchPokemonData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Load more クリックイベント
   */
  const clickedloadMorePokemon = async () => {
    // ローダーを表示
    setLoader(true);
    const nextTwelvePokemon = await getPokemonList(search);
    loadPokemon(nextTwelvePokemon.data.pokemonList, "more");
    // ローダーを再度非表示
    setLoader(false);
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
        searchDipatch({
          type: "setPageNumber",
          pokeIdList: getPokeIdList(data),
          val: 1,
          actionType: "search",
        });
        break;
      }
      case "more": {
        const combinedPokemonData = [...pokemonData, ...data];
        setPokemonData(combinedPokemonData);
        if (search.actionType === "surprise") {
          searchDipatch({
            type: "setPageNumber",
            pokeIdList: getPokeIdList(combinedPokemonData),
            val: search.pageNumber + 1,
            actionType: "surprise",
          });
        } else {
          searchDipatch({
            type: "setPageNumber",
            pokeIdList: getPokeIdList(combinedPokemonData),
            val: search.pageNumber + 1,
            actionType: "search",
          });
        }
        break;
      }
      default:
        break;
    }
  };

  /***** JSX ******/
  return (
    <section id="result" css={[results, clearTable]}>
      {pokemonData.length > 0 && typeof pokemonData !== void 0 ?
        // Pokemonリストを取得できた時
        <>
          <ul css={resultsList}>
            {pokemonData.map((pokemon, i) => {
              return <PokemonList key={i} pokemon={pokemon} />;
            })}
          </ul>
          <div css={contentBlock}>
            {loader && <Load />}
            {
              search.isLoadMoreNeeded &&
              <LoadMore clickedloadMorePokemon={clickedloadMorePokemon} />
            }
          </div>
        </>
        :
        // Pokemonリストを取得できず、エラーの時
        <>
          {loader && <Load />}
          <div css={[push1, column12]}>
            <Alert />
          </div>
        </>
      }
    </section>
  );
};

export default Results;
