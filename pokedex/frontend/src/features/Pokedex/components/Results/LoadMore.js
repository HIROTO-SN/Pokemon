/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const LoadMore = () => {
  return (
    <a href id="loadMore" css={loadMore}>
      <span css={buttonLightBlue}>Load more Pokémon</span>
    </a>
  );
};

const loadMore = css`
  display: inline-block;
  clear: both;
  width: 100%;
  appearance: none;
  background: transparent;
  border: none;
  line-height: 125%;
  margin: 0;
  padding: 0;
  text-align: center;
  text-transform: none;
  font-size: 100%;
  font-family: "Flexo-Demi", arial, sans-serif;
	
	> span {
    display: inline-block;
    margin: 0 auto;
    font-size: 100%;
    font-family: "Flexo-Demi", arial, sans-serif;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    line-height: 125%;
    margin: 1.5625%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
    text-transform: none;
  }
`;

const buttonLightBlue = css`
  background-color: #30a7d7;
  color: #fff;
`;

export default LoadMore;
