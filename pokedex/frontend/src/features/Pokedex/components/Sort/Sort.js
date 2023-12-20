/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { push1, column12 } from "../../../../components/CommonCss/Layout.js";
import { TfiReload } from "react-icons/tfi";
import { CgPokemon } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";

const Sort = () => {
  const sort = css`
    overflow: visible;
    padding: 1em 0;
    background: transparent url("/background/content_bg.png") left top;
    background-size: 100% 1px;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1024px;
    width: 100%;

    :before {
      content: "";
      display: table;
    }

    :after {
      clear: both;
      content: "";
      display: table;
    }
  `;

  const buttonSurprise = css`
    float: left;
    margin-right: -100%;
    width: 34.71%;
    margin-top: 2em;
    margin-left: 0.78125%;
    background-color: #30a7d7;
    color: #fff;
    border-radius: 5px;
    border: none;
    clear: both;
    cursor: pointer;
    font-size: 105%;
    line-height: 125%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
    text-transform: none;
    font-family: "Flexo-Demi", arial, sans-serif;

    > svg {
      line-height: 100%;
      position: relative;
      top: 2px;
      margin-right: 0.5em;
    }
  `;

  const flex = css`
    display: flex;
    float: right;
    margin-top: 2em;
    width: inherit;
    max-width: 45%;
  `;

  const sortLabel = css`
    white-space: nowrap;
    color: #a4a4a4;
    font-size: 125%;
    line-height: 125%;
    text-transform: none;
    margin: 0.5em 0.75em 0.5em 0;
    font-family: "Flexo-Medium", arial, sans-serif;
  `;

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

  return (
    <section css={sort}>
      <div css={[push1, column12]}>
        <a id="shuffle" css={buttonSurprise}>
          <TfiReload strokeWidth="1.7" />
          Surprise Me!
        </a>
        <div css={flex}>
          <h3 css={sortLabel}>Sort By</h3>
          <div css={customSelectWrapper}>
            <select id="sortOrder" style={{ display: "none" }}></select>
            <div css={customSelectMenu}>
              <label id="sortOrderSelect">
                <CgPokemon />
                Lowest Number(First)
                <IoIosArrowDown viewBox="0 100 412 412" />
              </label>
              <ul></ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sort;
