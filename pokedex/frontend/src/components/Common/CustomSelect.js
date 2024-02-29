/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const CustomSelect = () => {

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
    <div css={customSelectWrapper}>
      <select id="abilities" style={{ display: "none" }}></select>
      <div css={customSelectMenu}>
        <label>
          <CgPokemon />
          All
          <IoIosArrowDown viewBox="0 100 412 412" />
        </label>
        <div></div>
      </div>
    </div>
  );
};

export default CustomSelect;
