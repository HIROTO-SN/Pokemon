/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const push1 = css`
	margin-left: 7.2525%;
	@media (min-width: 461px) and (max-width: 960px) {
		margin: 0;
    margin-left: 7.2525%;
	}
`;
export const push2 = css`
	margin-left: 14.5125%;
`;
export const push7 = css`
	margin-left: 50.7825%;
	@media (min-width: 461px) and (max-width: 960px) {
		margin: 0;
		margin-left: 7.2525%;
	}
`;
export const push8 = css({
	marginLeft: '58.0325%',
});

export const column5 = css({
	float: 'left',
	marginRight: '-100%',
	width: '34.71%',
});
export const column6 = css`
	float: left;
	margin-right: -100%;
	width: 41.96%;

	@media (min-width: 461px) and (max-width: 960px) {
    width: 85.49%;
	}
`;
export const column7 = css`
	float: left;
	margin-right: -100%;
	width: 49.22%;
`;
export const column10 = css`
	float: left;
	margin-right: -100%;
	width: 70.98%;
`;
export const column12 = css({
	float: 'left',
	marginRight: '-100%',
	width: '85.49%',
});

export const colorBlack = css`
	color: #313131;
`;



export const ttHint = css({
	display: 'none',
});

export const container = css`
	box-sizing: border-box;
  background: #fff url("./background/container_bg.png");
  clear: both;
  display: block;
  margin: 0 auto;
  max-width: 1280px;
  overflow: hidden;
  position: relative;
`;

export const section = css`
	padding: 1em 0;
	background: transparent url("./background/content_bg.png") left top;
	background-size: 100% 1px;
	display: block;
	margin: 0 auto;
	overflow: hidden;
	max-width: 1024px;
	width: 100%;

	:first-of-type {
		padding-top: 25px;
	};
`;

export const visibleMobile = css`
	text-transform: none;
	@media (min-width: 461px) and (max-width: 960px) {
		display: inherit !important;
	}
	@media (min-width: 961px) and (max-width: 9999px) {
		display: none;
	}
`;
export const hiddenMobile = css`
	@media (min-width: 461px) and (max-width: 960px) {
		display: none;
	}
	@media (min-width: 961px) and (max-width: 9999px) {
		display: inherit !important;
	}
`;