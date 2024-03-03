/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { CgPokemon } from "react-icons/cg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { pokeSearchSubmit } from "../../features/Pokedex/utils/PokeCommmonFunc";
import { useSearchCondition, useSearchDispatch, useSetLoader, useSetNoResult, useSetPokemonData } from "../../features/Pokedex/contexts/SearchContext";

/**
 * カスタムセレクトボックス
 */
const CustomSelect = ({ type: typeAction, state, dispatch, list, custom, clickSubmit }) => {
  /***** CSS *****/
  const useCss = useSelectCss();
  const useSearch = useSearchCondition();
  const searchDipatch = useSearchDispatch();
  const setPokemon = useSetPokemonData();
  const setLoader = useSetLoader();
  const setNoResult = useSetNoResult();

  /***** Definition ******/
  const [isListOpened, setIsListOpened] = useState(false);

  /***** JS ******/
  const listItemClickHandler = async(list, clickSubmit) => {
    arrowClickHandler();
    dispatch({ type: typeAction, val: list.id })
    if (clickSubmit && state !== list.id ) {
      setLoader(true);
      const newSearch = { ...useSearch, sortBy: list.id};
      await pokeSearchSubmit(newSearch, setPokemon, searchDipatch, setNoResult, "search");
      setLoader(false);
    }
  };

  /**
   * カスタムCSS用Hooks
   */
  const arrowClickHandler = () => {
    setIsListOpened(!isListOpened);
  };

  /***** HTML ******/
  return (
    <div css={useCss.wrapper}>
      <label onClick={() => arrowClickHandler()}>
        <CgPokemon css={useCss.svg1Custom()} />
        {list.find(li => li.id === state).name}
        {isListOpened ? (
          <IoIosArrowUp
            css={useCss.svg2Custom()}
            viewBox="0 150 412 412"
          ></IoIosArrowUp>
        ) : (
          <IoIosArrowDown
            css={useCss.svg2Custom()}
            viewBox="0 150 412 412"
          ></IoIosArrowDown>
        )}
      </label>
      <div css={[useCss.scrollbar(custom, isListOpened)]}>
        <div css={custom.scrollbarColor && useCss.viewport(custom)}>
          <ul>
            {list.map((_list) => (
              <li
                key={_list.name}
                onClick={() => listItemClickHandler(_list, clickSubmit)}
                css={useCss.customList(custom)}
              >
                {_list.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * カスタムCSS用Hooks
 */
const useSelectCss = () => {
  /**
   * セレクトボックス全体囲い
   */
  const wrapper = () => css`
    visibility: visible;
    width: 100%;
    float: left;
    position: relative;
    z-index: 2;

    > label {
      background-color: #313131;
      border-radius: 5px;
      display: block;
      font-size: 100%;
      padding: 0.5em 0;
      text-indent: 0.5em;
      height: auto;
      overflow: hidden;
      cursor: pointer;
    }
  `;

  /**
   * svgイメージ1つ目
   */
  const svg1Custom = () => css`
    vertical-align: middle;
    font-size: 150%;
    margin-right: 0.5em;
  `;

  /**
   * svgイメージ2つ目
   */
  const svg2Custom = () => css`
    vertical-align: middle;
    padding: 1em 0.75em 0.425em 0.425em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;

    :hover {
      background-color: #1d1d1d;
    }
  `;

  /**
   * カスタムセレクトボックス中スクロール部分囲い
   */
  const scrollbar = (custom, isListOpened) => css`
    display: ${isListOpened ? "block" : "none"};
    height: ${custom.height};
    background-color: ${custom.backgroundColor};
    clear: both;
    border-radius: 0 0 5px 5px;
    color: #fff;
    overflow: hidden;
    position: absolute;
    padding: 0;
    top: 2.5em;
    width: 100%;
    z-index: 50;
  `;

  // カスタムセレクトボックス スクロール制御
  const viewport = (custom) => css`
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    overflow-y: scroll;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 22px;
      height: 22px;
    }

    ::-webkit-scrollbar-button {
      background: ${custom.scrollbarColor === "dark"
        ? "url('./background/scrollbar_bg_dark.png') 2px 0 no-repeat"
        : "url('./background/scrollbar_bg.png') 2px 0 no-repeat"};
      width: 19px;
      height: 14px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${custom.scrollbarColor === "dark" ? "#313131" : "#fff"};
      border-radius: 6px;
      width: 10px;
      border: 4px solid transparent;
      background-clip: padding-box;
    }

    ::-webkit-scrollbar-track {
      margin: 5px;
    }
  `;

  const customList = (custom) => css`
    clear: both;
    width: 93.75%;
    padding: 0.75em 3.125% 0.675em;
    cursor: pointer;
    :hover {
      color: ${custom.listWordColor != void 0 && custom.listWordColor };
      background-color: #313131;
    }
  `;
  return {
    wrapper,
    svg1Custom,
    svg2Custom,
    scrollbar,
    viewport,
    customList,
  };
};

export default CustomSelect;
