import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const FilterMobile = ({ toggleActive }) => {
  
  const SimpleFilterWrapper = styled.div`
    background: none;
    display: block;
    margin: 1em auto;
    overflow: hidden;
    max-width: 1024px;
    width: 100%;
    height: ${!toggleActive ? "inherit" : "0px"};
  `;

  return (
		<SimpleFilterWrapper>
      <ul></ul>
		</SimpleFilterWrapper>
	);
};

export default FilterMobile;
