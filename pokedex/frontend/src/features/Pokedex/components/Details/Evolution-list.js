/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { li_pill } from "../../../../components/CommonCss/PokedexCss";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/ConvToolUtils";

const EvolutionList = ({ evolutionPoint: p = 1, list, arrowFlg }) => {
  /***** Definition ******/
  const c = useCssEvolutionList();

  // console.log("*********************");
  // console.log(list.types);

  /***** JSX ******/
  return (
    <li css={c.evolution_li(p, list.stage, arrowFlg)}>
      <Link to={list.link} onClick={() => window.location.reload(true)}>
        <img css={c.li_img(p)} src={list.src} alt={list.pokemonName} />
        <h3 css={c.li_h3(p)}>
          {" "}
          {list.pokemonName}{" "}
          <span>#{Number(list.pokemonId).toString().padStart(4, "0")}</span>
        </h3>
        <ul css={c.evolution_types}>
          {list.types.map((type) => (
            <li
              key={list.pokemonName + "-" + type.name}
              css={li_pill(type.name)}
            >
              {capitalizeFirstLetter(type.name)}
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
};

/**
 * CSS定義
 */
const useCssEvolutionList = () => {
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
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @param {Boolean} flg - 方向矢印（＞）を付与するか判定
   */
  const evolution_li = (p, s, flg) => css`
    position: relative;
    float: left;
    margin-top: ${calcMarginTop(p, s)};
    margin-right: ${calcMarginRight(p, s)};
    margin-bottom: ${calcMarginBottom(p, s)};
    margin-left: ${calcMarginLeft(p, s)};
    width: ${calcWidth(p, s)};
    ${flg && arrowStage};
  `;

  const arrowStage = css`
    :after {
      right: -40%;
      top: 11%;
      content: ">";
      font-size: 450%;
      position: absolute;
      transform: scale(0.6, 1.2);
    }
  `;

  /**
   * TOPマージン計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   * @param {Number} s - 進化stage（何番目の進化系か）
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
   * @param {Number} s - 進化stage（何番目の進化系か）
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
   * @param {Number} s - 進化stage（何番目の進化系か）
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
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginLeft = (p, s) => {
    switch (p) {
      case 1:
        return "29.0225%";
      case 3:
        if (s === 1) {
          return "7.2525%";
        } else if (s === 2) {
          return "39.9025%";
        } else if (s === 3) {
          return "72.5425%";
        }
      default:
        return "1em";
    }
  };

  /**
   * 横幅計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
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

export default EvolutionList;
