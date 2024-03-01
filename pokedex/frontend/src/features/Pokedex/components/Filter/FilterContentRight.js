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
import {
  useSearchCondition,
  useSearchDispatch,
} from "../../contexts/SearchContext";
import usePokeSearchHook from "../../utils/PokeSearchHook";
import { abilityList } from "../../../../constants/ul_list/pokedexList.js";

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
    margin-left: ${name == "middle" && "5.62%"};
    margin-right: ${name == "middle" && "5.62%"};
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

  const button = css`
    border-radius: 5px;
    border: none;
    cursor: pointer;
    line-height: 125%;
    margin: 1.5625%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
    text-transform: none;
    font-family: "Flexo-Demi", arial, sans-serif;
  `;

  const buttonOrange = css`
    color: #fff;
    background-color: #ee6b2f;
    transition: 0.2s;

    :hover {
      background-color: #d05f2b;
    }
  `;

  const buttonGray = css`
    background-color: #a4a4a4;
    color: #fff;
    transition: 0.2s;

    :hover {
      background-color: #8c8585;
    }
  `;

  /***** Definition ******/
  const clickedHeightList = useSearchCondition().height;
  const clickedWeightList = useSearchCondition().weight;
  const selectedAbility = useSearchCondition().ability;
  const selectedSort = useSearchCondition().sortBy;
  const searchDipatch = useSearchDispatch();
  const [ searchAction ] = usePokeSearchHook();

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
      func_map(name, "h_");
    });
    clickedWeightList.map((name) => {
      func_map(name, "w_");
    });
  };

  /***** HTML ******/
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
                />
              </span>
              <span css={offscreen}></span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <div css={filterAction}>
          <a id="advSearch" css={[buttonOrange, button]} onClick={searchAction}>
            <CgSearch strokeWidth="1" />
            Search
          </a>
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
