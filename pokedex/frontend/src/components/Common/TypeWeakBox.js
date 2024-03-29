/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { capitalizeFirstLetter } from "../../features/Pokedex/utils/ConvToolUtils";
import { clearTable } from "../CommonCss/Layout";
import { Link } from "react-router-dom";
import { li_pill } from "../CommonCss/PokedexCss";
import { generateUUID } from "../CommonFunc/Common";
import ToolTip from "./ToolTip";

const TypeWeaksBox = ({ id, list }) => {
  /***** Definition ******/
  const c = useCssPokemonDetails();

  console.log(list);

  return (
    <div id={id}>
      <h3 css={c.h3_style}>{capitalizeFirstLetter(id)}</h3>
      <ul css={[c.ul_style, clearTable]}>
        {list.map((_list, i) => (
          <li key={generateUUID()} css={[c.li_style(i), li_pill(_list.name)]}>
            <Link to="/pokedex">
              <span>
                {capitalizeFirstLetter(_list.name)}
                {_list.effectivePoint > 2.0 && (
                  <>
                    <ToolTip text="Deals 4x damage">
                      <i css={c.extraDamage} />
                    </ToolTip>
                  </>
                )}
              </span>
            </Link>
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
    margin: ${i === (1 || 3 || 5) ? "0.5em 1.5625% 0 1.5625%" : "0.5em 0 0 0"};
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
      z-index: 3;

      > span {
        display: inline-block;
        position: relative;
      }
    }
  `;

  const extraDamage = css`
    border-radius: 20px;
    background-color: #616161;
    position: absolute;
    top: -2px;
    right: 15px;
    height: 20px;
    vertical-align: middle;
    width: 20px;
    z-index: 5;

    :before {
      content: "*";
      color: #fff;
      font-family: sans-serif;
      font-size: 30px;
      font-style: normal;
      font-weight: normal;
      left: 4px;
      position: absolute;
      top: 9px;
    }
  `;

  return {
    h3_style,
    ul_style,
    li_style,
    extraDamage,
  };
};

export default TypeWeaksBox;
