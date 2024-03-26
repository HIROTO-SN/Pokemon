/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { li_pill } from "../../../../components/CommonCss/PokedexCss";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/ConvToolUtils";

const EvolutionList = ({ evolutionPoint: p = 1, list }) => {
  /***** Definition ******/
  const c = useCssEvolutionList();

  /***** JSX ******/
  return (
    <Link to={`/pokedex/${list.pokemonName}`} state={list.pokemonId}>
      <img css={c.li_img(list,p)} src={list.src} alt={list.pokemonName} />
      <h3 css={c.li_h3(p)}>
        {" "}
        {list.pokemonName}{" "}
        <span>#{Number(list.pokemonId).toString().padStart(4, "0")}</span>
      </h3>
      <ul css={c.evolution_types(list.types.length)}>
        {list.types.map((type) => (
          <li key={list.pokemonName + "-" + type.name} css={li_pill(type.name)}>
            {capitalizeFirstLetter(type.name)}
          </li>
        ))}
      </ul>
    </Link>
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
   * 各imgタグスタイル
   * @param {List} list - pokemon情報リスト
   * @param {Number} p - Evolutionポイント
   */
  const li_img = (list, p) => css`
    box-shadow: 0 4px 4px 0px #212121;
    background-color: #616161;
    border: 5px solid #fff;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
    max-width: ${cal_maxWidth(list.stage, p)};
    width: 100%;
  `;

  /**
   * imgの最大幅を計算
   * @param {Number} s - 対象ぽpokemonの進化ステージ
   * @param {Number} p - Evolutionポイント
   */
  const cal_maxWidth = (s, p) => {
    switch (p) {
      case 31:
        return s === 1 ? "150px" : "100px";
      case 81:
        return s === 1 ? "150px" : "80px";
      default: 
        return "150px";
    }
  }

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

  /**
   * タイプ部分
   * @param {Number} len - タイプの数
   */
  const evolution_types = (len) => css`
    display: block;
    float: ${len === 1 ? "none" : "left"};
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
      ${len === 2 && "float: left"};
    }
    > li:last-of-type {
      ${len === 2 && "float: right"};
    }
  `;

  return {
    evolutionWrapper,
    li_img,
    li_h3,
    evolution_types,
  };
};

export default EvolutionList;
