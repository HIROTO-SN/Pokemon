/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column12, push1 } from "../../../../components/CommonCss/Layout";
import { dogEarBl, li_pill } from "../../../../components/CommonCss/PokedexCss";
import { noEvolution } from "../../../../constants/ConstantsGeneral";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/ConvToolUtils";

const Evolution = ({ evolutionList }) => {
  /***** Definition ******/
  const c = useCssEvolution();
  // console.log(evolutionList.length);

  const point = 1;

  return (
    <div css={[push1, column12, c.evolutionWrapper, dogEarBl]}>
      <h2>Evolutions</h2>
      {point === 1 && <p>{noEvolution}</p>}
      {evolutionList.map((list_1, i) => (
        <ul key={"stage_1_list" + i}>
          <li css={c.evolution_li(point)}>
            <Link to={list_1.link} onClick={() => window.location.reload(true)}>
              <img
                css={c.li_img(point)}
                src={list_1.src}
                alt={list_1.pokemonName}
              />
              <h3 css={c.li_h3(point)}>
                {" "}
                {list_1.pokemonName}{" "}
                <span>
                  #{Number(list_1.pokemonId).toString().padStart(4, "0")}
                </span>
              </h3>
              <ul css={c.evolution_types}>
                {list_1.types.map((type) => (
                  <li key={"stage_1_list" + type.name} css={li_pill(type.name)}>
                    {capitalizeFirstLetter(type.name)}
                  </li>
                ))}
              </ul>
            </Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

/**
 * CSS定義
 */
const useCssEvolution = () => {
  const evolutionWrapper = css`
    background: transparent url("../background/body_gray_bg.png");
    border-radius: 5px;
    position: relative;

    > h2 {
      font-family: "Roboto", arial, sans-serif;
      font-size: 137.5%;
      line-height: 125%;
      font-weight: 500;
      color: #fff;
      margin: 1em 0 0 1em;
      text-transform: none;
    }

    & p {
      color: #fff;
      margin: 0.5em 1.325em;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      font-weight: 500;
      line-height: 125%;
    }
  `;

  /**
   * 進化リスト位置、それぞれのImgファイルの幅調整
   * @param {Number} p - Evolutionポイント
   */
  const evolution_li = (p) => css`
    position: relative;
    float: left;
    margin-top: ${calcMarginTop(p)};
    margin-right: ${calcMarginRight(p)};
    margin-bottom: ${calcMarginBottom(p)};
    margin-left: ${calcMarginLeft(p)};
    width: ${calcWidth(p)};
  `;

  /**
   * TOPマージン計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginTop = (p) => {
    switch (p) {
      case 1:
      default:
        return "1em";
    }
  };

  /**
   * RIGHTマージン計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginRight = (p) => {
    switch (p) {
      case 1:
      default:
        return "-100%";
    }
  };

  /**
   * BOTTOMマージン計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginBottom = (p) => {
    switch (p) {
      case 1:
      default:
        return "2em";
    }
  };

  /**
   * LEFTマージン計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginLeft = (p) => {
    switch (p) {
      case 1:
        return "29.0225%";
      default:
        return "1em";
    }
  };

  /**
   * 横幅計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcWidth = (p) => {
    switch (p) {
      case 1:
        return "41.96%";
      default:
        return "20.2%";
    }
  };

  /**
   * 各imgタグスタイル
   * @param {Number} p - Evolutionポイント
   */
  const li_img = (p) => css`
    box-shadow: 0 4px 4px 0px #212121;
    background-color: #616161;
    border: 5px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    max-width: 150px;
    width: 100%;
  `;

  /**
   * 各ポケモン名、Idへ充てるスタイル
   * @param {Number} p - Evolutionポイント
   */
  const li_h3 = (p) => css`
    clear: both;
    color: #fff;
    font-size: 125%;
    line-height: 125%;
    font-family: "Flexo-Medium", arial, sans-serif;
    float: left;
    margin: 0.75em 0;
    text-align: center;
    width: 100%;

    > span {
      font-family: "Flexo-Regular", arial, sans-serif;
      color: #a4acaf;
    }
  `;

  // タイプ部
  const evolution_types = css`
    display: block;
    float: left;
    text-align: center;
    width: 100%;

    // タイプリスト部
    > li {
      min-height: 12px;
      font-family: "Flexo-Medium", arial, sans-serif;
      border-radius: 5px;
      display: inline-block;
      font-size: 75%;
      padding: 0.25em 0;
      text-align: center;
      width: 48.4375%;
      word-break: break-all;
    }
    > li:first-of-type {
      float: left;
    }
    > li:last-of-type {
      float: right;
    }
  `;

  return {
    evolutionWrapper,
    evolution_li,
    li_img,
    li_h3,
    evolution_types,
  };
};

export default Evolution;
