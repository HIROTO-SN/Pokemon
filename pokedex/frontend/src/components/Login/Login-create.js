/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { accountButton } from "./Login";

const LoginCreate = () => {
  /***** CSS ******/
  const colorBlockP = css`
    color: #313131;
    font-family: "Exo", arial, sans-serif;
    min-height: 146px;
    margin-left: 1.25em;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
    margin: 0.5em 0.5em 0 1em;
  `;

  const colorBlockA = css`
    font-size: 16px;
    margin-left: 0px;
    margin-right: 0px;
    line-height: 112.5%;
    font-family: "Flexo-Medium", arial, sans-serif;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  `;

  // CreateAccountボタン
  const buttonLightblue = css`
    float: right;
    margin-right: 0;
    font-size: 112.5%;
    line-height: 112.5%;
    font-family: "Flexo-Medium", arial, sans-serif;
    margin: 0.5em 0.5em 0 1em;
    background-color: #30a7d7;
    color: #fff;

		:hover {
			background-color: #1b82b1;
		}
		
    @media (min-width: 961px) and (max-width: 9999px) {
      margin-top: 1em;
      margin-bottom: 1em;
      margin-right: 1em;
    }
  `;

  // 下部の凹凸レイアウト
  const notchBottomCenter = css`
    margin-left: 25%;
    width: 50%;
    backface-visibility: hidden;
    background: #fff;
    float: left;
    height: 8px;

    :before {
      left: -10px;
      background: transparent url("./background/left-notch-bottom-right.png")
        no-repeat;
      background-size: 12px 8px;
      backface-visibility: hidden;
      top: 0;
      content: " ";
      height: 8px;
      position: absolute;
      width: 12px;
    }

    :after {
      right: -10px;
      background: transparent url("./background/right-notch-bottom-right.png")
        no-repeat;
      background-size: 12px 8px;
      backface-visibility: hidden;
      top: 0;
      content: " ";
      height: 8px;
      position: absolute;
      width: 12px;
    }

    @media (min-width: 961px) and (max-width: 9999px) {
      position: absolute;
      bottom: 0;
    }
  `;

  const hiddenMobile = css`
    @media (min-width: 461px) and (max-width: 960px) {
      display: none !important;
    }
    @media (min-width: 961px) and (max-width: 9999px) {
      display: inherit !important;
    }
  `;

  return (
    <>
      <p css={colorBlockP}>
        <span>
          Create a Pokémon Trainer Club account today! With a Pokémon Trainer
          Club account, you can manage your Pokemon.com profile, play Pokémon
          Trading Card Game Live, and more.
        </span>
        <a
          css={colorBlockA}
          href="https://www.pokemon.com/us/join-the-pokemon-trainer-club/"
        >
          &nbsp;Get details
        </a>
        <span>!</span>
      </p>
      <a
        id="user-account-signup"
        href="https://club.pokemon.com/us/pokemon-trainer-club/sign-up/"
        css={[accountButton, buttonLightblue]}
      >
        Create an Account!
      </a>
      <span css={[notchBottomCenter, hiddenMobile]}></span>
    </>
  );
};

export default LoginCreate;
