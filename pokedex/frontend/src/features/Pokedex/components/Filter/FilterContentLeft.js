/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  CLICKED_COLOR
} from "../../../../constants/ConstantsGeneral";
import { typeList } from "../../../../constants/ul_list/pokedexList";
import {
  useSearchCondition,
  useSearchDispatch,
} from "../../contexts/SearchContext";
import { toHalfWidth } from "../../../../components/CommonFunc/Common";

const FilterContentLeft = () => {
  /***** CSS ******/
  const ContentBlock = styled.div`
    clear: both;
    display: block;
    width: 100%;
    float: left;
    margin: 1em 0 0 0;
    position: relative;
  `;

  /* ブロック1: タイトル */
  const wrapperH2 = css`
    padding: 0;
    float: left;
    margin-right: -100%;
    width: 49.22%;
    color: #fff;
    font-size: 167.5%;
  `;

  const sectionTitle = css`
    margin: 0.5em 0;
    cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;
  `;

  const filterHelp = css`
    margin-right: -100%;
    margin-left: 50.7825%;
    width: 49.22%;
    float: left;

    > span {
      font-family: "Flexo-Medium", arial, sans-serif;
      color: #fff;
      font-size: 90%;
      float: left;
      margin-top: 1.75em;
      margin-right: 3.125%;
      text-transform: none;
    }
  `;

  /* ブロック2: タイプList */
  const twList = css`
    float: left;
    height: 370px;
    width: 100%;
    list-style: none;

    > li {
      float: left;
      height: 28px;
      margin-bottom: 12px;
      width: 50%;
    }
  `;

  const pill = ({ type }) => css`
    border: 2px solid #a4a4a4;
    border-radius: 5px;
    line-height: 28px;
    max-width: 110px;
    width: 50%;
    font-family: "Flexo-Medium", arial, sans-serif;
    cursor: pointer;
    float: left;
    height: 28px;
    margin: 0 0.75em 0 0;
    text-align: center;
    background: ${type.background};
    color: ${type.color ? type.color : "inherit"};
  `;

  const filterTypeRound = (flg) => css`
    font-family: "Flexo-Bold", arial, sans-serif;
    background: ${flg ? CLICKED_COLOR.TW : "#f2f2f2"};
    border-radius: 14px;
    color: #313131;
    line-height: 30px;
    width: 28px;
    cursor: pointer;
    float: left;
    height: 28px;
    margin: 0 0.75em 0 0;
    text-align: center;
  `;

  const filterWeaknessRound = (flg) => css`
    cursor: pointer;
    margin-right: 0;
    font-family: "Flexo-Bold", arial, sans-serif;
    background: ${flg ? CLICKED_COLOR.TW : "#f2f2f2"};
    border-radius: 14px;
    color: #313131;
    line-height: 30px;
    width: 28px;
    float: left;
    height: 28px;
    margin: 0 0.75em 0 0;
    text-align: center;
  `;

  /* ブロック3: NumberRange */
  const rangeFilterWrapper = css`
    clear: both;
    display: block;
    margin: 0 0 1.5em;
    width: 93.75%;

    > h3 {
      color: #fff;
      font-size: 167.5%;
      float: left;
      margin-right: -100%;
      margin-top: 0.5em;
      margin-bottom: 1em;
      text-transform: none;
      width: 100%;
      line-height: 125%;
    }
    @media (min-width: 461px) and (max-width: 960px) {
      margin-bottom: 2em;
    }
  `;

  const rangeBox = css`
    @media screen and (min-width: 961px) {
      margin-top: 10px;
      float: right;
    }
    margin-bottom: 5px;

    > span {
      padding: 0 10px;
    }
  `;

  const inputArea = css`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    font-size: 100%;
    font-family: "Roboto", arial, sans-serif;
    line-height: 1.5;
    padding: 0.5em 0;
    text-indent: 0.5em;
    height: auto;
    background-color: #fff;
  `;
  const commonRangeBox = css`
    color: black;
    width: 75px;
    display: inline;
  `;

  const rangeValues = css`
    display: none;
    float: left;
    margin-right: -100%;
    width: 34.71%;
    margin-left: 65.2925%;
    font-family: "Flexo-Medium", arial, sans-serif;
    color: #fff;
    font-size: 175%;
    margin-top: 0.325em;
    margin-bottom: 1em;
    text-align: right;
    font-weight: 500;
    line-height: 125%;
  `;

  /***** Definition ******/
  const clickedTypeList = useSearchCondition().types;
  const clickedWeakList = useSearchCondition().weaks;
  const searchDipatch = useSearchDispatch();

  /***** JS ******/
  /**
   * @param {String} id - クリックされたボタンのタイプID
   * @param {String} type - クリックされたボタンの種類（T or W）
   * Type,WeakボタンのState更新関数
   */
  const clickTWHandler = (id, type) => {
    switch (type) {
      case "T":
        if (clickedTypeList.find((_type_id) => _type_id === id)) {
          // 選択されているタイプ（T)をクリックしたとき（削除）
          const filteredTypeList = clickedTypeList.filter(
            (_type_id) => _type_id !== id
          );
          searchDipatch({ type: "checkType", val: filteredTypeList });
        } else {
          // 選択されていないタイプをクリックしたとき（追加）
          searchDipatch({ type: "checkType", val: [...clickedTypeList, id] });
        }
        break;
      case "W":
        if (clickedWeakList.find((_type_id) => _type_id === id)) {
          // 選択されている弱点（W)をクリックしたとき（削除）
          const filteredWeakList = clickedWeakList.filter(
            (_type_id) => _type_id !== id
          );
          searchDipatch({ type: "checkWeak", val: filteredWeakList });
        } else {
          // 選択されていない弱点をクリックしたとき（追加）
          searchDipatch({ type: "checkWeak", val: [...clickedWeakList, id] });
        }
        break;
      default:
        break;
    }
  };

  /***** JS ******/
  /**
   * @param {Object} e - イベントオブジェクト
   * NumberRangeを変更されたとき
   */
  const changeNumberHandler = (e) => {
    searchDipatch({ type: e.target.id, val: e.target.value });
  };

  /**
   * Type, Weak ボタンの背景色セット
   */
  useEffect(() => {
    // map処理共通
    const func_map = (val, type) => {
      const el_target = document.querySelector("#" + type + val);
      el_target.style.background = CLICKED_COLOR.TW;
    };

    clickedTypeList.map((id) => {
      func_map(id, "t_");
    });
    clickedWeakList.map((id) => {
      func_map(id, "w_");
    });
  }, [clickedTypeList, clickedWeakList]);

  /***** JSX ******/
  return (
    <>
      <ContentBlock>
        <h2 css={[sectionTitle, wrapperH2]}>Type & Weakness</h2>
        <div css={filterHelp}>
          <span>
            <strong>T</strong> = Type
          </span>
          <span>
            <strong>W</strong> = Weakness
          </span>
        </div>
      </ContentBlock>
      <ContentBlock>
        <ul css={twList}>
          {typeList.map((type) => (
            <li key={type.name}>
              <span css={pill({ type })}>{type.name}</span>
              <span
                id={"t_" + type.type_id}
                css={filterTypeRound(
                  clickedTypeList.find((_type_id) => _type_id === type.type_id)
                )}
                onClick={() => clickTWHandler(type.type_id, "T")}
              >
                T
              </span>
              <span
                id={"w_" + type.type_id}
                css={filterWeaknessRound(
                  clickedWeakList.find((_weak_id) => _weak_id === type.type_id)
                )}
                onClick={() => clickTWHandler(type.type_id, "W")}
              >
                W
              </span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <div css={rangeFilterWrapper}>
          <h3>Number Range</h3>
          <div css={rangeBox}>
            <InputArea type="min" blurHandler={changeNumberHandler} />
            <span>-</span>
            <InputArea type="max" blurHandler={changeNumberHandler} />
          </div>
        </div>
        <p css={rangeValues}>
          <span id="min"></span>-<span id="max"></span>
        </p>
      </ContentBlock>
    </>
  );
};

const InputArea = ({ type }) => {
  /***** CSS ******/
  const inputArea = css`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    font-size: 100%;
    font-family: "Roboto", arial, sans-serif;
    line-height: 1.5;
    padding: 0.5em 0;
    text-indent: 0.5em;
    height: auto;
    background-color: #fff;
  `;

  const commonRangeBox = css`
    color: black;
    width: 75px;
    display: inline;
  `;

  const searchCondition = useSearchCondition();
  const searchDipatch = useSearchDispatch();

  /**
   * 初期レンダー時にステートのセット
   */
  useEffect(() => {
    if (type === "min") {
      document.querySelector("#numberMinInput").value =
        searchCondition.numberRangeMin;
    } else {
      document.querySelector("#numberMaxInput").value =
        searchCondition.numberRangeMax;
    }
  }, []);

  /***** JSX ******/
  return (
    <input
      id={type === "min" ? "numberMinInput" : "numberMaxInput"}
      css={[commonRangeBox, inputArea]}
      onBlur={(e) => searchDipatch({ type: e.target.id, val: toHalfWidth(e.target.value) })}
    ></input>
  );
};

export default FilterContentLeft;
