/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  capitalizeFirstLetter,
} from "../../features/Pokedex/utils/ConvToolUtils";
import { clearTable } from "../CommonCss/Layout";
import { Link } from "react-router-dom";
import { li_pill } from "../CommonCss/PokedexCss";  

const TypeWeaksBox = ({ id, list }) => {
  /***** Definition ******/
  const c = useCssPokemonDetails();

  return (
    <div id={id}>
      <h3 css={c.h3_style}>{capitalizeFirstLetter(id)}</h3>
      <ul css={[c.ul_style, clearTable]}>
        {list.map((_list, i) => (
          <li css={[c.li_style(i), li_pill(_list.name)]}>
            <Link to="/pokedex">{capitalizeFirstLetter(_list.name)}</Link>
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
  return {
    h3_style,
    ul_style,
		li_style,
  };
};

export default TypeWeaksBox;
