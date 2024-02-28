/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CgPokemon } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { useEffect, useState } from "react";
import PokeSearchHook from "../../utils/PokeSearchHook";
import { CLICKED_COLOR, HEIGHT_LIST, WEIGHT_LIST } from "../../../../constants/ConstantsGeneral";
import { useSearchCondition, useSearchDispatch } from "../../contexts/SearchContext";

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

  /* ブロック1つ目 */
  const customSelectWrapper = css`
    visibility: visible;
    width: 100%;
    float: left;
    position: relative;
    z-index: 2;
  `;

  const customSelectMenu = css`
    display: block;
    float: left;
    position: relative;
    width: 100%;
    z-index: 2;

    > label {
      box-sizing: border-box;
      background-color: #313131;
      border: none;
      border-radius: 5px;
      color: #fff;
      display: block;
      font-size: 100%;
      font-family: "Roboto", arial, sans-serif;
      line-height: 1.5;
      padding: 0.5em 0;
      text-indent: 0.5em;
      width: 100%;
      height: auto;
      margin: 0;
      overflow: hidden;
      cursor: pointer;
      white-space: nowrap;
    }
    > label > svg:first-of-type {
      font-family: "icons";
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      font-weight: normal;
      font-style: normal;
      text-decoration: inherit;
      text-transform: none;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      color: #f2f2f2;
      font-size: 150%;
      margin-right: 0.5em;
    }
    > label > svg:nth-of-type(2) {
      background-color: #313131;
      color: #fff;
      vertical-align: middle;
      font-family: "icons";
      display: inline-block;
      line-height: 1;
      font-weight: normal;
      font-style: normal;
      font-size: 100%;
      text-decoration: inherit;
      text-transform: none;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      border-radius: 5px;
      padding: 1em 0.75em 0.425em 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      text-indent: 0.5em;
    }
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
  const searchDipatch = useSearchDispatch();

  const [ searchAction ] = PokeSearchHook();

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
          const filteredHeightList = clickedHeightList.filter((n) => n !== name);
          searchDipatch({ type: "searchHeight", val: filteredHeightList });
        } else {
          searchDipatch({ type: "searchHeight", val: [...clickedHeightList, name] });
        }
        break;
      case "W":
        if (clickedWeightList.find((n) => n === name)) {
          const filteredWeightList = clickedWeightList.filter((n) => n !== name);
          searchDipatch({ type: "searchWeight", val: [...filteredWeightList] });
        } else {
          searchDipatch({ type: "searchWeight", val: [...clickedWeightList, name] });
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
  })

  /**
   * 高さと重さの背景色制御
   */ 
  const backgroundHandler = () => {
    // map処理共通
    const func_map = (val, type) => {
      const el_target = document.querySelector("#" + type + val);
      el_target.style.background = CLICKED_COLOR.HW;
    }
    clickedHeightList.map((name) => {
      func_map(name, "h_");
    });
    clickedWeightList.map((name) => {
      func_map(name, "w_");
    });

  }

  /***** HTML ******/
  return (
    <>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Ability</h3>
        <div css={customSelectWrapper}>
          <select id="abilities" style={{ display: "none" }}></select>
          <div css={customSelectMenu}>
            <label>
              <CgPokemon />
              All
              <IoIosArrowDown viewBox="0 100 412 412" />
            </label>
            <div></div>
          </div>
        </div>
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
          <a id="reset" css={[buttonGray, button]}>
            Reset
          </a>
        </div>
      </ContentBlock>
    </>
  );
};

export default FilterContentRight;
