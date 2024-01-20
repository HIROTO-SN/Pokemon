/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const VerifyAge = () => {
  /***** CSS ******/
  // 全体ラップ
  const formWrapper = css`
    float: left;
    margin-right: -100%;
    width: 70.98%;
    background-color: #f2f2f2;
    border-radius: 5px 0 0 5px;
    position: relative;
  `;
  const dogEarTl = css`
    :before {
      content: " ";
      background: url("./background/default-dog-ear.png") no-repeat 0 0;
      height: 2em;
      position: absolute;
      width: 2em;
      z-index: 3;
      left: -1px;
      top: -1px;
      backface-visibility: hidden;
    }
  `;
  // All FIELDS ARE REQUIRED 部分
  const fieldRequired = css`
    color: #616161;
    margin: 2em 0 0 2em;
    text-transform: none;
    font-family: "Roboto", arial, sans-serif;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
  `;

  // form囲い
  const formInner = css`
    margin: 2em;
  `;

  // form下注釈囲い
  const logInRow = css`
    min-height: 250px;
    border-radius: 0 0 0 5px;
    background-color: #616161;
    display: block;
    float: left;
    padding: 2.12em 0;
    width: 100%;

    > h4 {
      color: #4dad5b;
      font-weight: 600;
      font-size: 112.5%;
      line-height: 120%;
      margin: 0 2em;
      font-family: "Flexo-Medium", arial, sans-serif;
      text-transform: none;
    }

    > p {
      color: #fff;
      font-size: 112.5%;
      line-height: 122%;
      margin: 0.5em 2em 1em;
      font-family: "Roboto",arial,sans-serif;
      font-weight: 500;
    }
  `;

  const linkLigInNow = css`
    font-size: 100%!important;
  `;

  return (
    <div css={[formWrapper, dogEarTl]}>
      <p css={fieldRequired}>ALL FIELDS ARE REQUIRED.</p>
      <form id="verify-age" css={formInner}>
        <label htmlFor="dob">Date of Birth</label>
        <div>
          <div></div>
        </div>
        <label htmlFor="country"></label>
      </form>
      <div css={logInRow}>
        <h4>With a Pokémon Trainer Club account, you can:</h4>
        <p>Log in to Pokémon apps, sign up for newsletters, and more!</p>
        <p css={linkLigInNow}>
          If you already have an account, please
          <Link to="/login"> log in now.</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyAge;
