import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  push1,
  push8,
  column5,
  column7,
  clearTable,
} from "../../../../components/CommonCss/Layout.js";
import FilterContentLeft from "./FilterContentLeft.js";
import FilterContentRight from "./FilterContentRight.js";


const FilterContent = ({toggleActive}) => {
  
  const pokedexFilterWrapper = css`
    background: none;
    display: block;
    margin: 0 auto;
    max-width: 1024px;
    overflow: hidden;
    height: ${!toggleActive ? "0px" : "inherit"};
  `;

  return (
    <div css={pokedexFilterWrapper}>
      <div css={clearTable}>
        <div css={[column7, push1]}><FilterContentLeft/></div>
        <div css={[column5, push8]}><FilterContentRight/></div>
      </div>
    </div>
  );
};


export default FilterContent;
