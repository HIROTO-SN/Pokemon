/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link as Scroll } from "react-scroll";
import { ttHint } from "../../../../components/CommonCss/Layout";
import {
  useSearchCondition,
  useSearchDispatch,
  useSetLoader,
  useSetNoResult,
  useSetPokemonData,
} from "../../contexts/SearchContext";
import { pokeSearchSubmit } from "../../utils/PokeCommmonFunc";

const FilterHeaderSearch = () => {
  /***** CSS ******/
  const searchInputItems = css`
    position: relative;
    height: 48px;
    padding-top: 13px;
    width: 100%;
    display: inline-flex;
    margin-bottom: 10px;
  `;

  const twitterTypehead = css`
    position: relative;
    display: inline-block;
    top: 0;
    margin-top: unset;
    margin-right: -100%;
    width: 72.5425%;
    border: 3px solid #616161;
    clear: both;
    margin-top: 0.325em;
    background-color: #fff;
    border-radius: 5px;
    color: #212121;

    input:first-of-type {
      position: absolute;
      top: 0px;
      left: 0px;
      border-color: transparent;
      box-shadow: none;
      opacity: 1;
      background: none 0% 0% / auto repeat scroll padding-box border-box
        rgb(255, 255, 255);
      margin-top: unset;
      box-sizing: border-box;
      border: none;
      border-radius: 5px;
      font-size: 100%;
      font-family: "Roboto", arial, sans-serif;
      line-height: 1.5;
      padding: 0.5em 0;
      text-indent: 0.5em;
      width: 100%;
      height: auto;
      color: #fff;
    }

    input:nth-of-type(2) {
      position: relative;
      background-color: transparent;
      top: 0;
      margin-top: unset;
      border: none;
      color: #313131;
      margin: 0;
      width: 100%;
      border-radius: 5px;
      clear: both;
      float: left;
      box-sizing: border-box;
      display: block;
      font-size: 100%;
      font-family: "Roboto", arial, sans-serif;
      line-height: 1.5;
      padding: 0.5em 0;
      text-indent: 0.5em;
      height: auto;
    }
    pre {
      display: block;
      position: absolute;
      visibility: hidden;
      white-space: pre;
      font-family: Roboto, arial, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-variant: normal;
      font-weight: 400;
      word-spacing: 0px;
      letter-spacing: 0px;
      text-indent: 8px;
      text-rendering: auto;
      text-transform: none;
      color: #212121;
    }
  `;

  const buttonSearch = css`
    margin-left: 105%;
    margin-top: unset;
    margin-right: -100%;
    top: 0;
    float: left;
    width: 12.95%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("/icons/search.png");
    background-color: #ee6b2f;
    background-size: 40%;
    color: #fff;
    clear: none;
    text-indent: -9999px;
    position: relative;
    appearance: none;
    border: none;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.1s;

    :hover {
      background-color: #d6602a;
    }
  `;

  /***** Definition ******/
  const searchDipatch = useSearchDispatch();
  const useSearch = useSearchCondition();
  const setPokemon = useSetPokemonData();
  const setLoader = useSetLoader();
  const setNoResult = useSetNoResult();

  /***** JS ******/
  /**
   * @param {Object} e - イベントオブジェクト
   * 検索Input内容チェンジイベント
   */
  const searchInputChange = (e) => {
    searchDipatch({ type: e.target.id, val: e.target.value });
  };

  const clickSearch = async () => {
    setLoader(true);
    // 共通API接続関数を呼び出し
    await pokeSearchSubmit(useSearch, setPokemon, searchDipatch, setNoResult);
    setLoader(false);
  };

  /***** JSX ******/
  return (
    <div css={searchInputItems}>
      <span css={twitterTypehead}>
        <input css={ttHint}></input>
        <input
          id="searchInput"
          onChange={(e) => searchInputChange(e)}
          value={useSearch.searchInput}
        ></input>
        <pre></pre>
      </span>
      <Scroll
        to="result"
        smooth={true}
        duration={1000}
        css={buttonSearch}
        onClick={() => clickSearch()}
      ></Scroll>
    </div>
  );
};

export default FilterHeaderSearch;
