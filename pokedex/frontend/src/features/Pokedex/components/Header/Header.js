import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { push1,push7,column6 } from "../../../../components/CommonCss/Layout.js"

const Header = () => {
	return (
		<section css={pokedexHeader}>
			<div css={[push1,column6]}>
				<h1>Pokedex</h1>
			</div>
			<div css={[push7,column6]}/>
		</section>
	)
}

const pokedexHeader = css`
	padding-top: 25px;
	overflow: visible;
	padding: 1em 0;
	background: transparent url("/background/content_bg.png") left top;
	background-size: 100% 1px;
	display: block;
	margin: 0 auto;
	overflow: hidden;
	max-width: 1024px;
	width: 100%;

	:before {
		content: '';
		display: table;
	}
	:after {
		clear: both;
		content: "";
    display: table;
	}
	::backdrop {
		background: rgba(0,0,0,0.8);
	}
	div:nth-of-type(1) h1 {
		padding: 0;
		margin: 0.5em 0;
		color: #919191;
    cursor: default;
    font-size: 187.5%;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular",arial,sans-serif;
	}
`;

export default Header;