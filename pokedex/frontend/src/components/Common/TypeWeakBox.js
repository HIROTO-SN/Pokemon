/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  capitalizeFirstLetter,
  setBackGroundForTypes,
  setFontColorForTypes,
} from "../../features/Pokedex/utils/ConvToolUtils";
import { clearTable } from "../CommonCss/Layout";
import { Link } from "react-router-dom";

const TypeWeaksBox = ({ id, list }) => {
  /***** Definition ******/
  const cssObj = useCssPokemonDetails();

  return (
    <div id={id}>
      <h3 css={cssObj.h3_style}>{capitalizeFirstLetter(id)}</h3>
      <ul css={[cssObj.ul_style, clearTable]}>
        {list.map((_list, i) => (
          <li css={[cssObj.li_style(i), cssObj.li_pill(_list.name)]}>
            <Link to="/pokedex">{_list.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * CSS定義
 */
const useCssPokemonDetails = () => {
  const h3_style = css`
    font-family: "Flexo-Medium", arial, sans-serif;
    clear: both;
    color: #212121;
    float: left;
    text-transform: none;
    width: 100%;
    font-size: 125%;
    line-height: 125%;
    margin: 1.25em 0 0.5em 0;
  `;

  const ul_style = css`
    float: left;
    width: 100%;
  `;

	/**
	 * li部分スタイル
	 * @param {Number} i - listのi番目
	 */
  const li_style = (i) => css`
		margin: ${(i === (1 || 3 || 5)) ? "0.5em 1.5625% 0 1.5625%" : "0.5em 0 0 0"};
    float: left;
    width: 32.29%;
    border-radius: 5px;
    padding: 0;
    text-align: center;

    > a {
      font-family: "Flexo-Medium", arial, sans-serif;
      color: inherit;
      display: block;
      float: left;
      line-height: 100%;
      padding: 0.5em 0;
      width: 100%;
    }
  `

  /**
   * 背景色、文字色をセット
   * @param {Strig} typeName - タイプ名
   */
  const li_pill = (typeName) => css`
    background: ${setBackGroundForTypes(typeName)};
    color: ${setFontColorForTypes(typeName)};
  `;

  return {
    h3_style,
    ul_style,
		li_style,
    li_pill,
  };
};

export default TypeWeaksBox;
