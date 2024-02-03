/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  useInputAccountInfo,
  useSetInputAccountInfo,
} from "../../../contexts/SignupContext";
import {
  acceptInfo,
  buttonLightblue,
  buttonRight,
  checkBox,
  clear,
  contentBlock,
  contentBlockFull,
  customFormElements,
  dogEarTl,
  fieldRequired,
  formField,
  formInner,
  formWrapper,
  inRowSelect,
  submitButton,
} from "../../CommonCss/AccountCss";
import {
  alertError,
  column10,
  customScrollBar,
  hiddenMobile,
  noPaddingTop,
  push2,
  section,
  viewport,
} from "../../CommonCss/Layout";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { useEffect, useState } from "react";
import AlertSignUp from "./AlertSignUp";
import { useNavigate } from "react-router-dom";
import {
  emailCheck,
  fieldInputEmptyCheck,
  passwordCheck,
} from "../../CommonFunc/CommonAlert";
import {
  valid_message_emailNoMatch,
  valid_message_passInclude,
  valid_message_passNoMatch,
  valid_message_required,
} from "../../../constants/ValidationMessage";
import { lal_email_receive_title, lal_news_check, lal_term_check, lal_updates_check, p_continue_warning, p_disp_question_title, p_email, p_password, p_username } from "../../../constants/ConstantsGeneral";

const VerifyAccount = ({ Banner }) => {
  /***** CSS ******/
  const wrapperCustom = css`
    min-height: 1151px;
  `;
  // セクション下隙間補正
  const sectionUserAccount = css`
    padding-bottom: 60px;
  `;

  // Checkユーザー名
  const checkAvailability = css`
    width: 100%;
    text-transform: none;
    white-space: normal;
    padding: 12px;
    margin: 3px 0;
  `;

  const buttonCustom = css`
    background-color: #ccc;
    border-radius: 5px;
    border: none;
    clear: both;
    color: #212121;
    cursor: pointer;
    font-size: 105%;
    float: left;
    line-height: 125%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
    text-transform: none;
    font-family: "Flexo-Demi", arial, sans-serif;
  `;
  // pタグ説明文
  const nameFieldDesc = css`
    color: #616161;
    font-size: 87.5%;
    margin-top: 0.5em;
    font-family: "Roboto", arial, sans-serif;
    font-weight: 500;
    line-height: 125%;
  `;

  // pタグ注意書き（ラジオ選択部）
  const dispField = css`
    font-family: "Roboto", arial, sans-serif;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
    margin: 0.5em 0;
  `;

  //　必須サイン（ポケモンボールSVG）
  const requiredSVG = css`
    height: 0.5em;
    width: 0.5em;
    margin-right: 0.2em;
    margin-bottom: 0.3em;
  `;

  // // Newsチェックボックス背景色動的変化
  // const boxGeneral = (flg) => css`
  //   background-color: ${flg ? "#4dad5b" : "#313131"};
  // `;

  // // Pokemon Center チェックボックス背景色動的変化
  // const boxPcenter = (flg) => css`
  //   background-color: ${flg ? "#4dad5b" : "#313131"};
  // `;

  // // Terms チェックボックス背景色動的変化
  // const boxTerms = (flg) => css`
  //   background-color: ${flg ? "#4dad5b" : "#313131"};
  // `;

  // Terms&Condition囲い
  const termsAgreement = css`
    padding-top: 1em !important;

    > h2 {
      color: #212121;
      font-size: 130%;
      line-height: 125%;
      text-transform: none;
      font-family: "Flexo-Medium", arial, sans-serif;
      margin: 0.75em 0;
    }

    & p {
      color: #616161;
      margin: 0.5em 0 1em;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      font-weight: 500;
      line-height: 125%;
    }
  `;

  const termWrapper = css`
    background-color: #616161;
    border-radius: 5px;
    height: 300px;
  `;

  /***** context ******/
  const accountInfo = useInputAccountInfo();
  const setAccountInfo = useSetInputAccountInfo();

  /***** Definition ******/
  const [isTermsCheck, setTermsCheck] = useState(false);
  const [termAlert, setTermAlert] = useState(false);
  const errorContentInit = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    confirmEmail: "",
  };
  const [error, setError] = useState(errorContentInit);
  const navigate = useNavigate();

  /***** JS ******/
  // 初期表示時処理
  useEffect(() => {}, []);

  // メール受信するかしないかの判定
  const checkClickHandler = (e) => {
    const id = e.target.id;
    let flg = false;

    switch (id) {
      case "email-general":
        setAccountInfo({
          ...accountInfo,
          newsInfoReceiveFlg: !accountInfo.newsInfoReceiveFlg,
        });
        flg = !accountInfo.newsInfoReceiveFlg;
        break;
      case "email-pcenter":
        setAccountInfo({
          ...accountInfo,
          updateCenterReceiveFlg: !accountInfo.updateCenterReceiveFlg,
        });
        flg = !accountInfo.updateCenterReceiveFlg;
        break;
      case "terms":
        setTermsCheck(!isTermsCheck);
        flg = !isTermsCheck;
        break;
      default:
        break;
    }
    const el = document.querySelector("#" + id);
    el.nextElementSibling.style.backgroundColor = flg ? "#4dad5b" : "#313131";
  };

  // Continueボタン押下イベント
  const continueClickHanlder = () => {
    let newError;
    // 入力チェック
    newError = fieldInputEmptyCheck(accountInfo, error);
    // パスワード文字列チェック
    if (newError.password != valid_message_required) {
      newError = { ...newError, password: passwordCheck(accountInfo.password) };

      // 確認用パスワードチェック
      // パスワード文字列チェックOK && 確認パスワード入力している時
      if (
        newError.confirmPassword != valid_message_required &&
        newError.password != valid_message_passInclude &&
        accountInfo.password !== accountInfo.confirmPassword
      ) {
        newError = { ...newError, confirmPassword: valid_message_passNoMatch };
      }
    }

    // Emailチェック
    if (newError.email != valid_message_required) {
      newError = { ...newError, email: emailCheck(accountInfo.email) };
    }

    // 確認用Emailチェック
    // 確認Email入力している時
    if (newError.confirmEmail != valid_message_required) {
      newError = {
        ...newError,
        confirmEmail: emailCheck(accountInfo.confirmEmail, false),
      };
      if (
        newError.email == "" &&
        accountInfo.email !== accountInfo.confirmEmail
      ) {
        newError = { ...newError, confirmEmail: valid_message_emailNoMatch };
      }
    }
    // Termチェック
    !isTermsCheck ? setTermAlert(true) : setTermAlert(false);

    // エラー内容セット
    setError(newError);

    // エラーがなければEmail認証ページへ遷移
    Object.values(newError).forEach((val) => {
      if (val != "") {
        setAccountInfo({ ...accountInfo, password: "", confirmPassword: "" });
        return;
      } else {
        navigate("/verifyaccount");
      }
    });
  };

  /***** HTML ******/
  return (
    <form>
      <fieldset css={[section, noPaddingTop, sectionUserAccount]}>
        <div css={[column10, push2]}>
          <div css={[contentBlock, contentBlockFull]}>
            <div css={[formWrapper, dogEarTl, wrapperCustom]}>
              <p css={fieldRequired}>All FIELDS ARE REQUIRED.</p>
              <div css={formInner}>
                <label htmlFor="username"> Username </label>
                <div css={formField}>
                  <input
                    id="username"
                    type="text"
                    css={customFormElements}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        username: e.target.value,
                      })
                    }
                    maxLength={16}
                  />
                  <input
                    type="button"
                    value="Check Availability"
                    css={[
                      checkAvailability,
                      buttonCustom,
                      buttonRight,
                      buttonLightblue,
                    ]}
                  />
                  <p css={nameFieldDesc}>{p_username}</p>
                  {error.username != "" && (
                    <AlertSignUp error={error.username} />
                  )}
                </div>
                <label htmlFor="password">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Password
                </label>
                <div css={formField}>
                  <input
                    id="password"
                    type="password"
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        password: e.target.value,
                      })
                    }
                    value={accountInfo.password}
                    css={customFormElements}
                    minLength={8}
                    maxLength={50}
                  />
                  <p css={nameFieldDesc}>{p_password}</p>
                  {error.password != "" && (
                    <AlertSignUp error={error.password} />
                  )}
                </div>
                <label htmlFor="confirm_password">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Confirm Password
                </label>
                <div css={formField}>
                  <input
                    id="confirmPassword"
                    type="password"
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        confirmPassword: e.target.value,
                      })
                    }
                    value={accountInfo.confirmPassword}
                    css={customFormElements}
                    minLength={8}
                    maxLength={50}
                  />
                  {error.confirmPassword != "" && (
                    <AlertSignUp error={error.confirmPassword} />
                  )}
                </div>
                <label htmlFor="email">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Email Address
                </label>
                <div css={formField}>
                  <input
                    type="email"
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        email: e.target.value,
                      })
                    }
                    css={customFormElements}
                    maxLength={75}
                  />
                  <p css={nameFieldDesc}>{p_email}</p>
                  {error.email != "" && <AlertSignUp error={error.email} />}
                </div>
                <label htmlFor="confirm_email">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Confirm Email
                </label>
                <div css={formField}>
                  <input
                    type="email"
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        confirmEmail: e.target.value,
                      })
                    }
                    css={customFormElements}
                    maxLength={75}
                  />
                  {error.confirmEmail != "" && (
                    <AlertSignUp error={error.confirmEmail} />
                  )}
                </div>
                <div></div>
                <label style={{ width: "100%" }}>{lal_email_receive_title}</label>
                <AcceptInfo
                  id="email-general"
                  lal={lal_news_check}
                  handler={checkClickHandler}
                />
                <AcceptInfo
                  id="email-pcenter"
                  lal={lal_updates_check}
                  handler={checkClickHandler}
                />
                <div css={clear}></div>
                <div>
                  <p css={dispField}>{p_disp_question_title}</p>
                  <p css={inRowSelect}>
                    <input
                      type="radio"
                      name="public_profile_opt_in"
                      value="true"
                      onChange={() =>
                        setAccountInfo({
                          ...accountInfo,
                          displayPokeClubProfile: true,
                        })
                      }
                      checked={accountInfo.displayPokeClubProfile}
                    />{" "}
                    Yes
                  </p>
                  <p css={inRowSelect}>
                    <input
                      type="radio"
                      name="public_profile_opt_in"
                      value="false"
                      onChange={() =>
                        setAccountInfo({
                          ...accountInfo,
                          displayPokeClubProfile: false,
                        })
                      }
                      checked={!accountInfo.displayPokeClubProfile}
                    />{" "}
                    No
                  </p>
                </div>
                <div css={clear}></div>
                <label htmlFor="screen_name"> Screen Name </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} maxLength={15} />
                  <p></p>
                  <input
                    type="button"
                    value="Check Availability"
                    css={[
                      checkAvailability,
                      buttonCustom,
                      buttonRight,
                      buttonLightblue,
                    ]}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        screenName: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <Banner />
          </div>
          <div css={hiddenMobile}>
            <p css={dispField}>
              For further information, please see our{" "}
              <a href="http://www.pokemon.com/us/privacy-notice/">
                Privacy Notice.
              </a>
            </p>
          </div>
        </div>
      </fieldset>
      <fieldset css={[section, termsAgreement]}>
        <div css={[push2, column10]}>
          <h2>Pokémon Website Terms of Use</h2>
          <p>
            Please scroll through the Terms of Use and click Submit to accept.
          </p>
          <div css={[termWrapper, customScrollBar]}>
            <div css={viewport}>
              <div></div>
            </div>
          </div>
          <AcceptInfo
            id="terms"
            lal={lal_term_check}
            handler={checkClickHandler}
            termAlert={termAlert}
          />
          <p style={{ paddingTop: "20px" }}>{p_continue_warning}
            <a href="http://www.pokemon.com/us/terms-of-use/">Terms of Use</a>
            .
          </p>
          <div></div>
          <input
            type="button"
            css={submitButton}
            value="Continue"
            onClick={() => continueClickHanlder()}
          ></input>
        </div>
      </fieldset>
    </form>
  );
};

export default VerifyAccount;

/**
 * チェックボックス付きラベル項目
 * @param {string} id - idの名前
 * @param {string} lal - label部コンテント
 * @param {Function} handler - ☑クリック時イベント処理関数
 * @param {Boolean} termAlert - 本要素全体を入力チェック対象にするかどうか
 * @returns
 */
const AcceptInfo = ({ id, lal, handler, termAlert }) => {
  return (
    <div css={acceptInfo}>
      <span>
        <span id={id} css={[checkBox]} onClick={(e) => handler(e)}></span>
        <GiCheckMark />
      </span>
      <label css={alertError(termAlert)}>{lal}</label>
    </div>
  );
};
