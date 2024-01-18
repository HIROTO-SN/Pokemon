/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { accountButton, hiddenMobile, notchBottomCenter } from "./Login";
import { push1 } from "../CommonCss/Layout";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLoginInfo, useLoginAction, useLoginErrorSet } from "../../contexts/LoginContext";
import { loginAuth } from "../api/LoginApi";
import { valid_message_passwordEmpty, valid_message_usernameEmpty } from "../../constants/ValidationMessage";

const LoginForm = () => {
  /***** CSS ******/

  // Form大元
  const formWrapper = css`
    float: left;
    margin-right: -100%;
    width: 70.98%;
    background-color: #f2f2f2;
    border-radius: 5px 0 0 5px;
    position: relative;

    @media (min-width: 461px) and (max-width: 960px) {
      border-radius: 5px;
      padding-bottom: 0;
      width: 96.875%;
      margin: 0 1.5625%;
    }
    @media (min-width: 961px) and (max-width: 9999px) {
      float: left;
      margin-right: -100%;
      width: 85%;
    }
  `;

  // Form内側
  const formInner = css`
    @media (min-width: 961px) and (max-width: 9999px) {
      margin: 2em 0em;
    }
  `;

  // ブロック下部レイアウト補正
  const pblock = css`
    color: #313131;
    font-family: "Exo", arial, sans-serif;
    min-height: 146px;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
    margin: 0.5em 0.5em 0 1.25em;
  `;
  // Usename & Password label
  const left = css`
    clear: both;
    color: #212121;
    float: left;
    font-size: 120%;
    line-height: 100%;
    margin: 0.875em 0 0.5em 0;
    width: 38.4375%;

    @media (min-width: 461px) and (max-width: 960px) {
      width: 96.875%;
      margin: 0 1.5625%;
    }
    @media (min-width: 961px) and (max-width: 9999px) {
      clear: both;
      color: #343434;
      float: left;
      font-size: 110%;
      line-height: 1.2em;
      margin: 0 0 0.5em 0;
      padding-top: 0.5em;
      width: 35%;
    }
  `;

  // テキストフィールド
  const formField = css`
    float: right;
    margin-bottom: 1em;
    width: 58.4375%;

    @media (min-width: 961px) and (max-width: 9999px) {
      width: 65%;
    }

    > input[type="text"] {
      -ms-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -o-box-sizing: border-box;
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
    }
  `;

  // aタグ
  const roboto = css`
    color: #1b53ba;
    text-decoration: underline;
    font-size: 100%;
    margin: 0.5em 0.5em 0.75em 1em;
    line-height: 112.5%;
    font-family: "Flexo-Medium", arial, sans-serif;
  `;

  // ログインボタンと枠の隙間
  const clear = css`
    :before {
      content: "";
      display: table;
    }
    :after {
      clear: both;
      content: "";
      display: table;
    }
  `;

  // ボタン
  const buttonGreen = css`
    clear: both;
    font-family: "Roboto",arial,sans-serif;
    float: right;
    margin-right: 0;
    appearance: none;
    border: none;
    text-align: center;
    cursor: pointer;
    background-color: #4dad5b;
    color: #fff;

    :hover {
      background-color: #369143;
    }
  `;

  // const pblock = css``;

  /***** context ******/
  const userState = useLoginInfo();
  const userStateAction = useLoginAction();

  /***** State ******/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const setError = useLoginErrorSet();

  /***** JS ******/
  const handleLoginSubmit = (e) => {
    e.preventDefault();
  
    // ログイン認証処理
    if(username == "") {
      setError(valid_message_usernameEmpty);
      return;
    } else if(password == "") {
      setError(valid_message_passwordEmpty);
      return;
    } else {
      setError("");
    }
    loginAuth(username, password, setError);

    // ログイン成功時処理
    userStateAction({username: username, isLogin: true});
    console.log("userState.username: " + userState.username);
    console.log("userState.isLogin: " + userState.isLogin);
    console.log("username: " + username);
    // navigate("/profile");
  };
  
  /***** HTML ******/
  return (
    <div css={[push1, formWrapper]}>
      <form id="login-form" css={formInner} onSubmit={handleLoginSubmit}>
        <label css={left} htmlFor="signInUser">
          Username
        </label>
        <div css={formField}>
          <input
            id="username"
            type="text"
            tabIndex={1}
            autoComplete="false"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <a css={roboto}>Forgot your username?</a>
        </div>
        <label css={left} htmlFor="signInPassword">
          Password
        </label>
        <div css={formField}>
          <input
            id="password"
            type="text"
            tabIndex={2}
            autoComplete="false"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <a css={roboto}>Forgot your password?</a>
        </div>
        <div css={clear}></div>
        <input
          id="login"
          name="login"
          type="submit"
          css={[accountButton, buttonGreen]}
          value="Log In"
          // onClick={onClickLogin}
        ></input>
      </form>
      <p css={pblock}> &nbsp; </p>
      <span css={[notchBottomCenter, hiddenMobile]}></span>
    </div>
  );
};

export default LoginForm;
