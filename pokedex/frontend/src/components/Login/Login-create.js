/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { accountButton, hiddenMobile, notchBottomCenter } from "./Login";
import { Link } from "react-router-dom";

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
      <Link to="../sign-up"
        id="user-account-signup"
        css={[accountButton, buttonLightblue]}
      >
        Create an Account!
      </Link>
      <span css={[notchBottomCenter, hiddenMobile]}></span>
    </>
  );
};

export default LoginCreate;
