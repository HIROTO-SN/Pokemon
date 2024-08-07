/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { CgSearch } from "react-icons/cg";
import CustomSelect from "../../../../components/Common/CustomSelect.js";
import {
  CLICKED_COLOR,
  HEIGHT_LIST,
  WEIGHT_LIST,
} from "../../../../constants/ConstantsGeneral";
import { abilityList } from "../../../../constants/ul_list/pokedexList.js";
import {
  useSearchCondition,
  useSearchDispatch,
  useSetLoader,
  useSetNoResult,
  useSetPokemonData,
} from "../../contexts/SearchContext";
import { pokeSearchSubmit } from "../../utils/PokeCommmonFunc.js";
import { Link as Scroll } from "react-scroll";
import { button, buttonGray, buttonOrange } from "../../../../components/CommonCss/PokedexCss.js";

const FilterContentRight = () => {
  /* ブロック全体CSS */
  const ContentBlock = styled.div`
    clear: both;
    display: block;
    width: 100%;
    float: left;
    margin: 1em 0 0 0;
    position: relative;
  `;

  const sectionTitle = css`
    margin: 0.5em 0;
    cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;
  `;

  const filterTitle = css`
    color: #fff;
    font-size: 167.5%;
    margin-left: 1.5625%;
    padding-left: 0;
    font-size: 187.5%;
  `;

  /* ブロック2つ目 */
  const filterWHeight = css`
    height: 80px;
    margin-bottom: 0.5em;
    width: 100%;
    list-style: none;

    > li {
      float: left;
      width: 27.46%;
      background-color: #f2f2f2;
      border-radius: 12px;
      color: #313131;
      cursor: pointer;
      height: 100%;
      margin: 0 1.5625%;
      overflow: hidden;
    }
    > li > span {
      color: #313131;
      font-size: 300%;
      line-height: 80px;
      text-align: center;
      width: 100%;
      vertical-align: middle;
    }
  `;
  const pill = (name) => css`
    margin-left: ${name === "middle" && "5.62%"};
    margin-right: ${name === "middle" && "5.62%"};
  `;
  const imgHWeight = ({ list }) => css`
    cursor: pointer;
    position: relative;
    top: ${list.top};
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  const offscreen = css`
    left: -99999px;
    position: absolute;
  `;

  /* ブロック4つ目 */
  const filterAction = css`
    float: right;
    clear: both;
    margin-top: 2.75em;
    width: 100%;

    > a {
      clear: none;
      float: right;
      font-size: 125%;
      line-height: 100%;
    }

    > a svg {
      line-height: 100%;
      position: relative;
      top: -1px;
      vertical-align: middle;
      margin-right: 5px;
    }
  `;

  /***** Definition ******/
  const useSearch = useSearchCondition();
  const clickedHeightList = useSearch.height;
  const clickedWeightList = useSearch.weight;
  const selectedAbility = useSearch.ability;
  const selectedSort = useSearch.sortBy;
  const searchDipatch = useSearchDispatch();
  const setPokemon = useSetPokemonData();
  const setLoader = useSetLoader();
  const setNoResult = useSetNoResult();

  // カスタムセレクトボックススタイル定義
  const customSelectStyle = {
    height: "300px",
    backgroundColor: "#a4a4a4",
    scrollbarColor: "dark",
    listWordColor: "green",
  };

  /***** JS ******/
  /**
   * @param {String} name - クリックされたボタンの高さ、または重さ名
   * @param {String} type - クリックされたボタンの種類（H or W）
   * Type,WeakボタンのState更新関数
   */
  const clickHWHandler = (name, type) => {
    switch (type) {
      case "H":
        if (clickedHeightList.find((n) => n === name)) {
          const filteredHeightList = clickedHeightList.filter(
            (n) => n !== name
          );
          searchDipatch({ type: "checkHeight", val: filteredHeightList });
        } else {
          searchDipatch({
            type: "checkHeight",
            val: [...clickedHeightList, name],
          });
        }
        break;
      case "W":
        if (clickedWeightList.find((n) => n === name)) {
          const filteredWeightList = clickedWeightList.filter(
            (n) => n !== name
          );
          searchDipatch({ type: "checkWeight", val: [...filteredWeightList] });
        } else {
          searchDipatch({
            type: "checkWeight",
            val: [...clickedWeightList, name],
          });
        }
        break;
      default:
        break;
    }
  };

  /**
   * 高さまたは重さのチェックがされた場合
   */
  useEffect(() => {
    backgroundHandler();
  }, [clickedWeightList, clickedHeightList]);

  /**
   * 初期表示処理
   */
  useEffect(() => {
    backgroundHandler();
  });

  /**
   * 高さと重さの背景色制御
   */
  const backgroundHandler = () => {
    // map処理共通
    const func_map = (val, type) => {
      const el_target = document.querySelector("#" + type + val);
      el_target.style.background = CLICKED_COLOR.HW;
    };
    clickedHeightList.map((name) => {
      return func_map(name, "h_");
    });
    clickedWeightList.map((name) => {
      return func_map(name, "w_");
    });
  };

  /**
   * 検索押下処理
   */
  const clickSearch = async() => {
    setLoader(true);
    // 共通API接続関数を呼び出し
    await pokeSearchSubmit(useSearch, setPokemon, searchDipatch, setNoResult);
    setLoader(false);
  };

  /***** JSX ******/
  return (
    <>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Ability</h3>
        <CustomSelect
          type="selectAbility"
          state={selectedAbility}
          dispatch={searchDipatch}
          list={abilityList}
          custom={customSelectStyle}
        />
      </ContentBlock>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Height</h3>
        <ul css={filterWHeight}>
          {HEIGHT_LIST.map((list) => (
            <li
              id={"h_" + list.name}
              css={pill(list.name)}
              key={list.name}
              onClick={() => clickHWHandler(list.name, "H")}
            >
              <span>
                <img
                  id={list.name + "_imgH"}
                  css={imgHWeight({ list })}
                  src={list.urlB}
                  height={list.height}
                  alt="imageHeight"
                />
              </span>
              <span css={offscreen}></span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Weight</h3>
        <ul css={filterWHeight}>
          {WEIGHT_LIST.map((list) => (
            <li
              id={"w_" + list.name}
              css={pill(list.name)}
              key={list.name}
              onClick={() => clickHWHandler(list.name, "W")}
            >
              <span>
                <img
                  css={imgHWeight({ list })}
                  src={list.urlB}
                  height={list.height}
                  alt="imageWeight"
                />
              </span>
              <span css={offscreen}></span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <div css={filterAction}>
          <Scroll
            id="advSearch"
            to="result"
            smooth={true}
            duration={600}
            css={[buttonOrange, button]}
            onClick={() => clickSearch()}
          >
            <CgSearch strokeWidth="1" />
            Search
          </Scroll>
          <a
            id="reset"
            css={[buttonGray, button]}
            onClick={() => searchDipatch({ type: "reset", val: selectedSort })}
          >
            Reset
          </a>
        </div>
      </ContentBlock>
    </>
  );
};

export default FilterContentRight;
