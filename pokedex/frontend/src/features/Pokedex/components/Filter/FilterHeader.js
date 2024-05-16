import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link as Scroll } from "react-scroll";
import {
  column6,
  push1,
  push7,
  ttHint,
} from "../../../../components/CommonCss/Layout.js";
import {
  useSearchCondition,
  useSearchDispatch,
  useSetLoader,
  useSetNoResult,
  useSetPokemonData,
} from "../../contexts/SearchContext.js";
import { pokeSearchSubmit } from "../../utils/PokeCommmonFunc.js";
import FilterHeaderSearch from "./FilterHeader-search.js";

const FilterHeader = () => {
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

  console.log(useSearch);

  /***** JSX ******/
  return (
    <DivFilterHead>
      <div>
        <div css={[column6, push1]}>
          <div css={filterTextSearch}>
            <label>Name or Number</label>
            <FilterHeaderSearch/>
          </div>
          <p css={subtitle}>
            Use the Advanced Search to explore Pokémon by type, weakness,
            Ability, and more!
          </p>
        </div>
        <div css={[column6, push7]}>
          <div css={contenBlcok}>
            <div css={searchBanner}>
              <h2>
                Search for a Pokémon by name or using its National Pokédex
                number.
              </h2>
            </div>
          </div>
        </div>
      </div>
    </DivFilterHead>
  );
};

const DivFilterHead = styled.div`
  background: #313131;
  float: left;
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

  > div {
    background: none;
    display: block;
    margin: 0 auto;
    overflow: visible;
    max-width: 1024px;
    width: 100%;
  }
`;

const filterTextSearch = css`
  margin-top: 2em;
  position: relative;
  :before {
    content: "";
    display: table;
  }
  :after {
    clear: both;
    content: "";
    display: table;
  }
  label {
    font-family: "Flexo-Regular", arial, sans-serif;
    float: left;
    font-size: 167.5%;
    text-transform: none;
    width: 100%;
  }
`;

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

const subtitle = css`
  clear: both;
  float: left;
  display: block;
  margin-top: 0;
  margin-bottom: 1.5em;
  font-family: "Roboto", arial, sans-serif;
  font-size: 100%;
  font-weight: 500;
  line-height: 125%;
  margin: 0.5em 0;
`;

const contenBlcok = css`
  margin: 2em 0 0.5em 0;
  clear: both;
  display: block;
  width: 100%;
  float: left;
  position: relative;
  color: white;
`;

const searchBanner = css`
  transition: none;
  background-color: #4dad5b;
  border-radius: 5px;
  float: left;
  padding-bottom: 0.75em;
  width: 100%;
  -webkit-transition: background-color 0.1s linear;
  -ms-transition: background-color 0.1s linear;
  -moz-transition: background-color 0.1s linear;
  -o-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
  background-color: #4dad5b;

  h2 {
    font-size: 125%;
    margin: 0.75em 0.5em 0.75em 1em;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Medium", arial, sans-serif;
  }
`;

export default FilterHeader;
