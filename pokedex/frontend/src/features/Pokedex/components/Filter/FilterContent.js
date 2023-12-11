import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  push1,
  push8,
  column5,
  column7,
} from "../../../../components/CommonCss/Layout.js";


const FilterContent = () => {
  return (
    <div css={pokedexFilterWrapper}>
      <div css={clear}>
        <div css={[column7, push1]}></div>
        <div css={[column5, push8]}></div>
      </div>
    </div>
  );
};

const pokedexFilterWrapper = css`
  background: none;
  display: block;
  margin: 0 auto;
  max-width: 1024px;
  overflow: hidden;
  height: 0px;
`;
const clear = css`
  :before{
		content: "";
    display: table;
	}
	:after{
		clear: both;
		content: "";
    display: table;
	}
`;

export default FilterContent;
