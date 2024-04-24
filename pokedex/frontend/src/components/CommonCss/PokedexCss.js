/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  setBackGroundForTypes,
  setFontColorForTypes,
} from "../../features/Pokedex/utils/ConvToolUtils";

/**
 * Pokedex, Pokemon Detail ページで使用する共通CSS
 */

/*** アニメーション ***/
/**
 * フェードイン
 * @param {Number} sec フェード時間
 */
export const animeFadeIn = (sec) => css`
  animation: fadeIn ${sec} ease;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

/*** アクセント ***/
/**
 * レイアウトにアクセントの為の凹凸をつける
 */
export const dogEarBl = css`
  ::before {
    content: " ";
    background: url("../background/default-dog-ear.png") no-repeat 0 0;
    height: 2em;
    position: absolute;
    width: 2em;
    z-index: 3;
    left: -1px;
    bottom: -1px;
    transform: rotate(-90deg);
  }
`;

/*** 色関連 ***/
/**
 * Type欄の背景色、文字色をセット
 * @param {Strig} typeName - タイプ名
 */
export const li_pill = (typeName) => css`
  background: ${setBackGroundForTypes(typeName)};
  color: ${setFontColorForTypes(typeName)};
`;

/*** レイアウト一般 ***/
export const contentBlock = css`
  float: left;
  margin: 1em 0 0 0;
  position: relative;

  @media (min-width: 1px) and (max-width: 460px) {
    float: left;
    margin-right: -100%;
    width: 89.12%;
    margin-left: 5.4425%;
  }

  @media (min-width: 461px) and (max-width: 960px) {
    float: left;
    margin-right: -100%;
    width: 89.12%;
    margin-left: 5.4425%;
  }
`;

export const contentBlockHalfFirst = css`
  margin-right: 3.125%;
  width: 48.4375%;

  @media (min-width: 1px) and (max-width: 460px) {
    clear: both;
    margin-top: 1em;
  }

  @media (min-width: 461px) and (max-width: 960px) {
    clear: both;
    margin-top: 1em;
  }
`;

export const contentBlockHalf = css`
  width: 48.4375%;

  @media (min-width: 1px) and (max-width: 460px) {
    clear: both;
    margin-top: 1em;
  }

  @media (min-width: 461px) and (max-width: 960px) {
    clear: both;
    margin-top: 1em;
  }
`;

/*** ボタン ***/
export const button = css`
  background-color: #ccc;
  border-radius: 5px;
  border: none;
  clear: both;
  color: #212121;
  cursor: pointer;
  font-size: 105%;
  float: left;
  line-height: 125%;
  margin: 1.5625%;
  padding: 0.75em 1.25em 0.675em;
  vertical-align: middle;
  text-align: center;
  text-transform: none;
  font-family: "Flexo-Demi", arial, sans-serif;
`;
export const buttonOrange = css`
  color: #fff !important;
  background-color: #ee6b2f !important;
  transition: 0.2s;

  :hover {
    background-color: #d05f2b !important;
  }
`;

export const buttonGray = css`
  background-color: #a4a4a4 !important;
  color: #fff !important;
  transition: 0.2s;

  :hover {
    background-color: #8c8585 !important;
  }
`;
