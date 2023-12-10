import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FilterHeader from "./FilterHeader";
import FilterContent from "./FilterContent";
import FilterWrapper from "./FilterWrapper";

const Filter = () => {
  return (
		<section css={filter}>
			<FilterHeader/>
			<FilterContent/>
			<FilterWrapper/>
		</section>
	)
};

const filter = css`
  clear: both;
  background: #616161;
  border-color: #212121;
  border-style: solid;
  border-width: 1px 0 0 0;
  width: 100%;
  padding-bottom: 1em;
`;
export default Filter;
