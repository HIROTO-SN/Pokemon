/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column10, container, push2, section, visibleMobile } from "../../CommonCss/Layout.js";
import { hiddenMobile } from "../Login.js";
import StepsMenu from "./StepsMenu.js";
import { CurrentPageProvider } from "../../../contexts/SignupContext.js";

const Signup = () => {
	/***** CSS ******/
	const useraccount = css`
		position: relative;
	`;
	
	const pageMainTitle = css`
		color: #999999;
		margin: 0;
		margin-left: 7.2525%;
		font-size: 175%;
		cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular",arial,sans-serif;
		
		@media (min-width: 461px) and (max-width: 960px) {
			background: #30a7d7;
			color: white;
			text-align: left;
			margin: 0;
			padding: 1em 0.5em;
			position: relative;
		}
		@media (min-width: 961px) and (max-width: 9999px) {
			margin-top: 1em;
			margin-bottom: 1em;
		}
	`;

	const pageSubTitle = css`
		color: #919191;
    font-size: 150%;
    line-height: 125%;
    margin: 1em 0.5em 0.5em 7.2525%;
	`;

	const notchBottomRightSmall = css`
		width: 30%;
		backface-visibility: hidden;
    background: #fff;
    float: left;
    height: 8px;
    margin: -6px 0 0 57.5%;
    position: relative;

		:before {
			left: -10px;
			background: transparent url("./background/left-notch-bottom-right.png") no-repeat;
    	background-size: 12px 8px;
			backface-visibility: hidden;
			top: 0;
			content: ' ';
			height: 8px;
			position: absolute;
			width: 12px;
		}
		:after {
			right: -10px;
			background: transparent url("./background/right-notch-bottom-right.png") no-repeat;
    	background-size: 12px 8px;
			backface-visibility: hidden;
			top: 0;
			content: ' ';
			height: 8px;
			position: absolute;
			width: 12px;
		}
	`;

	return (
		<CurrentPageProvider>
			<div css={[container]}>
				<section css={[section, useraccount]}>
					<h1 css={pageMainTitle}>Create Your Pokémon Trainer Club Account</h1>
					<span css={[notchBottomRightSmall, visibleMobile]}></span>
					<h2 css={[pageSubTitle, visibleMobile]}>Verify Age</h2>
					<div css={[column10, push2, hiddenMobile]}>
						<StepsMenu/>
					</div>
				</section>
				<div></div>
			</div>
		</CurrentPageProvider>
	)
}

export default Signup;