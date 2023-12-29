/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { push1, push7, column6, container } from "../CommonCss/Layout.js";
import LoginForm from "./Login-form.js";
import LoginCreate from "./Login-create.js";

const Login = () => {
  /***** CSS ******/
  const section = css`
    padding-bottom: 4em;
    padding-top: 25px;
    position: relative;
    background: transparent url("./background/content_bg.png") left top;
    background-size: 100% 1px;
    display: block;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1024px;
    width: 100%;
  `;

  // ページタイトル
  const pageMainTitle = css`
    color: #999999;
    font-size: 175%;
    cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;

    @media (min-width: 1281px) and (max-width: 9999px) {
      margin-top: 1em;
      margin-bottom: 1em;
    }

    @media (min-width: 461px) and (max-width: 960px) {
      background: #30a7d7;
      color: white;
      text-align: left;
      margin: 0;
      padding: 1em 0.5em;
      position: relative;
    }
  `;

  const sectionTitle = css`
    color: #919191;
    font-size: 150%;
    line-height: 125%;
    margin: 1em 0.5em 0.5em 0em;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;
  `;

  // それぞれのブロック
  const colorBlock = css`
    border-radius: 5px 5px 0 0;
    float: left;
    width: 100%;
    background-color: #f2f2f2;

    @media (min-width: 961px) and (max-width: 9999px) {
      margin-bottom: 0;
      min-height: 290px;
      position: relative;
    }
  `;

  // それぞれのブロック角部のレイアウト
  const dogEar = (type) => css`
    :before {
      content: " ";
      background: url("./background/default-dog-ear.png") no-repeat 0 0;
      height: 2em;
      position: absolute;
      width: 2em;
      z-index: 3;
      ${type === "bl" ? "left: -1px" : "right: -1px"};
      bottom: -1px;
      transform: ${type === "bl" ? "rotate(-90deg)" : "rotate(-180deg)"};
      backface-visibility: hidden;
    }
  `;

  // ポケモン画像部
  const aboutUsCharacters = css`
		max-width: 100%;
    height: auto;

    @media (min-width: 1281px) and (max-width: 9999px) {
      float: left;
      position: relative;
      margin-top: -75px;
      top: 0;
      right: 80px;
    }
  `;

  return (
    <div css={[container]}>
      <section css={section}>
        <h1 css={[pageMainTitle, push1]}>
          Welcome to the Pokémon Trainer Club!
        </h1>
        <div css={[push1, column6]}>
          <h2 css={sectionTitle}> Log In </h2>
          <div css={[colorBlock, dogEar("bl")]}>
            <LoginForm />
          </div>
        </div>
        <div css={[push7, column6]}>
          <h2 css={sectionTitle}> Join the Pokémon Trainer Club! </h2>
          <div css={[colorBlock, dogEar("br")]}>
            <LoginCreate />
          </div>
          <div css={aboutUsCharacters}>
            <img src="./additional/pokemon-login.png" alt="Characters" width="443" height="248"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export const accountButton = css`
  border-radius: 5px;
  border: none;
  clear: both;
  color: #212121;
  cursor: pointer;
  font-size: 105%;
  float: left;
  line-height: 125%;
  margin: 1.5625%;
  padding: 0.75em 1.25em 0.675em;
  vertical-align: middle;
  text-align: center;
  text-transform: none;
  font-family: "Flexo-Demi", arial, sans-serif;

  @media (min-width: 461px) and (max-width: 960px) {
    margin-top: 1em;
    margin-bottom: 1em;
    margin-right: 1em;
  }
`;

export default Login;
