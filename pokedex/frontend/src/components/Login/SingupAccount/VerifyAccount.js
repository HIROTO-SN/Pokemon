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
  customScrollbar,
  requiredSVG,
} from "../../CommonCss/AccountCss";
import {
  alertBox,
  alertError,
  alertH3,
  column10,
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
  available_message,
  valid_message_emailNoMatch,
  valid_message_passInclude,
  valid_message_passNoMatch,
  valid_message_required,
  valid_message_screenName,
  valid_message_username,
} from "../../../constants/ValidationMessage";
import {
  lal_email_receive_title,
  lal_news_check,
  lal_term_check,
  lal_updates_check,
  p_continue_warning,
  p_disp_question_title,
  p_email,
  p_password,
  p_username,
} from "../../../constants/ConstantsGeneral";
import { nameAvailabilityCheck, sendEmail, singUp } from "../../api/SignUpApi";

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
    position: relative!important;
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
    screenName: "",
  };
  const [error, setError] = useState(errorContentInit);
  const lengCheck = [
    { name: "username", minLength: 6, maxLength: 16 },
    { name: "screenName", minLength: 3, axLength: 15 },
  ];
  // check Availability ボタン押下時用
  const availableContentInit = [
    { name: "username", message: "" },
    { name: "screenName", message: "" },
  ];
  const [available, setAvailability] = useState(availableContentInit);
  // APIレスポンス受け取り用
  const responseContentInit = [
    { name: "username", status: 0, data: [] },
    { name: "screenName", status: 0, data: [] },
  ];
  const [response, setResponse] = useState(responseContentInit);
  const navigate = useNavigate();

  /***** JS ******/
  // 初期表示時処理
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  const checkAvailHandler = async (target) => {
    const scaler = lengCheck.find((el) => el.name === target);
    const newAvailability = available.find((el) => el.name === target);
    const newResponse = response.find((el) => el.name === target);
    const val = accountInfo[target];

    if (val.length < scaler.minLength || val.length > scaler.maxLength) {
      newAvailability.message = available_message.find(
        (e) => e.name === target
      ).invalid;
      newResponse.data = [];
      newResponse.status = 0;
    } else {
      // 非同期処理 ターゲット（ユーザー名 or スクリーン名）の重複チェック
      const res = await nameAvailabilityCheck(target, val);
      switch (res.status) {
        case 202: {
          // 重複なし
          newAvailability.message = available_message.find(
            (e) => e.name === target
          ).valid;
          newResponse.status = res.status;
          newResponse.data = [];
          break;
        }
        case 226: {
          // 重複あり
          newAvailability.message = available_message.find(
            (e) => e.name === target
          ).exists;
          newResponse.status = res.status;
          newResponse.data = res.data;
          break;
        }
        default:
          break;
      }
    }
    // レスポンス結果をステートにセット
    const _response = setState(response, newResponse);
    setResponse(_response);
    // 重複チェック結果をステートにセット
    const _available = setState(available, newAvailability);
    setAvailability(_available);

    // セット関数
    function setState(arr, newObj) {
      return arr.map((el) => {
        if (el.name === target) {
          return newObj;
        } else {
          return el;
        }
      });
    }
  };

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
  const continueClickHanlder = async () => {
    // 入力チェック
    let newError = fieldInputEmptyCheck(accountInfo, error);

    // ユーザー名文字列チェック
    if (newError.username != valid_message_required) {
      if (accountInfo.username.length < 6 || accountInfo.username.length > 16) {
        newError.username = valid_message_username;
      } else {
        // 重複チェック
        checkAvailHandler("username");
      }
    }
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
    // スクリーン名文字列チェック
    if (accountInfo.screenName != "") {
      if (accountInfo.screenName.length < 3 || accountInfo.username.length > 15) {
        newError.screenName = valid_message_screenName;
      } else {
        // 重複チェック
        checkAvailHandler("screenName");
      }
    } else {
      newError.screenName = "";
    }
    // Termチェック
    !isTermsCheck ? setTermAlert(true) : setTermAlert(false);

    // エラー内容セット
    setError(newError);

    // エラーがなければアカウントを作成しEmail認証ページへ遷移
    let errFlg = false;
    // for (var i = 0; i <= .length)
    Object.values(newError).some((el) => {
      if (el != "") {
        errFlg = true;
        return true;
      }
    });
    if (!errFlg) {
      const res_sign = await singUp(accountInfo);
      const res_mail = await sendEmail(accountInfo.email);
      if (res_sign === 200 && res_mail === 200) {
        sessionStorage.clear();
        navigate("/verifyaccount/3");
      } else {
        window.location.reload();
      }
    }
  };

  /***** JSX ******/
  return (
    <>
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
                    css={
                      error.username == ""
                        ? customFormElements
                        : [customFormElements, alertError(1)]
                    }
                    minLength={8}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        username: e.target.value,
                      })
                    }
                    maxLength={16}
                  />
                  <AvailableAlert
                    available={available.find((el) => el.name === "username")}
                    response={response.find((el) => el.name === "username")}
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
                    onClick={() => checkAvailHandler("username")}
                  />
                  <p css={nameFieldDesc}>{p_username}</p>
                  {error.username != "" && (
                    <AlertSignUp error={error.username} position="relative" />
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
                    css={
                      error.password == ""
                        ? customFormElements
                        : [customFormElements, alertError(1)]
                    }
                    minLength={8}
                    maxLength={50}
                  />
                  <p css={nameFieldDesc}>{p_password}</p>
                  {error.password != "" && (
                    <AlertSignUp error={error.password} position="relative"/>
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
                    css={
                      error.confirmPassword == ""
                        ? customFormElements
                        : [customFormElements, alertError(1)]
                    }
                    minLength={8}
                    maxLength={50}
                  />
                  {error.confirmPassword != "" && (
                    <AlertSignUp error={error.confirmPassword} position="relative"/>
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
                    css={
                      error.email == ""
                        ? customFormElements
                        : [customFormElements, alertError(1)]
                    }
                    minLength={8}
                    maxLength={75}
                  />
                  <p css={nameFieldDesc}>{p_email}</p>
                  {error.email != "" && <AlertSignUp error={error.email} position="relative"/>}
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
                    css={
                      error.confirmEmail == ""
                        ? customFormElements
                        : [customFormElements, alertError(1)]
                    }
                    minLength={8}
                    maxLength={75}
                  />
                  {error.confirmEmail != "" && (
                    <AlertSignUp error={error.confirmEmail} position="relative"/>
                  )}
                </div>
                <div></div>
                <label style={{ width: "100%" }}>
                  {lal_email_receive_title}
                </label>
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
                  <input
                    type="text"
                    css={customFormElements}
                    maxLength={15}
                    onChange={(e) =>
                      setAccountInfo({
                        ...accountInfo,
                        screenName: e.target.value,
                      })
                    }
                  />
                  <AvailableAlert
                    available={available.find((el) => el.name === "screenName")}
                    response={response.find((el) => el.name === "screenName")}
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
                    onClick={() => checkAvailHandler("screenName")}
                  />
                  {error.screenName != "" && (
                    <AlertSignUp error={error.screenName} position="relative"/>
                  )}
                </div>
              </div>
            </div>
            <Banner icon={1} />
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
          <div css={[termWrapper, customScrollbar]}>
            <div css={viewport}>
              <div></div>
            </div>
          </div>
          <p style={{ paddingTop: "20px", marginTop: "1.5em" }}>
            {p_continue_warning}
            <a href="http://www.pokemon.com/us/terms-of-use/">Terms of Use</a>.
          </p>
          <AcceptInfo
            id="terms"
            lal={lal_term_check}
            handler={checkClickHandler}
            termAlert={termAlert}
          />
          <div></div>
          <input
            type="button"
            css={submitButton}
            value="Continue"
            onClick={() => continueClickHanlder()}
          ></input>
        </div>
      </fieldset>
    </>
  );
};

export default VerifyAccount;

/**
 * チェックボックス付きラベル項目
 * @param {string} id - idの名前
 * @param {string} lal - label部コンテント
 * @param {Function} handler - ☑クリック時イベント処理関数
 * @param {Boolean} termAlert - 本要素全体を入力チェック対象にするかどうか
 * @return
 */
const AcceptInfo = ({ id, lal, handler, termAlert }) => {
  const color = termAlert && 1;
  return (
    <div css={acceptInfo}>
      <span>
        <span id={id} css={[checkBox]} onClick={(e) => handler(e)}></span>
        <GiCheckMark />
      </span>
      <label css={alertError(color)}>{lal}</label>
    </div>
  );
};

/**
 * Check Availability 押下時の入力チェック
 * @param {Object} available - 重複チェックの結果オブジェクト
 * @param {Object} response - チェック結果での重複回避サジェストリスト格納オブジェクト
 */
const AvailableAlert = ({ available, response }) => {
  const showFlg = available.message === "" ? true : false;
  const colorNo = (status) => {
    switch (status) {
      case 202:
        return 3;
      case 226:
        return 2;
      default:
        return 1;
    }
  };
  return (
    <div
      css={[alertBox, alertError(colorNo(response.status))]}
      style={{ display: showFlg && "none" }}
    >
      <h3 css={alertH3(colorNo(response.status))}>{available.message}</h3>
      {response.status === 226 && (
        <ul>
          {response.data.map((val) => {
            return <li key={val}>{val}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
