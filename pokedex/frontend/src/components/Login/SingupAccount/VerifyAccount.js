/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  useInputAccountInfo,
  useSetInputAccountInfo,
} from "../../../contexts/SignupContext";
import {
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
import { valid_message_required } from "../../../constants/ValidationMessage";
import { useNavigate } from "react-router-dom";

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
  // チェックボックス加工DIV用
  const acceptInfo = css`
    float: left;
    margin: 1em 0;
    position: relative;
    width: 100%;
    & input {
      position: absolute;
      top: 0;
      left: 0;
      top: 0;
      opacity: 0;
    }
    & label {
      float: left;
      margin-right: -100%;
      width: 85.49%;
      color: #616161;
      font-size: 87.5%;
      line-height: 180%;
      margin-left: 40px;
      margin-top: 0;
    }
    & svg {
      position: absolute;
      color: #313131;
      padding: 0.25em;
      border: none;
      background-color: transparent;
    }
  `;

  // Newsチェックボックス背景色動的変化
  const boxGeneral = (flg) => css`
    background-color: ${flg ? "#4dad5b" : "#313131"};
  `;

  // Pokemon Center チェックボックス背景色動的変化
  const boxPcenter = (flg) => css`
    background-color: ${flg ? "#4dad5b" : "#313131"};
  `;

  // Terms チェックボックス背景色動的変化
  const boxTerms = (flg) => css`
    background-color: ${flg ? "#4dad5b" : "#313131"};
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
  `;

  /***** context ******/
  const accountInfo = useInputAccountInfo();
  const setAccountInfo = useSetInputAccountInfo();

  /***** Definition ******/
  const [isTermsCheck, setTermsCheck] = useState(false);
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

    if (id === "email-general") {
      setAccountInfo({
        ...accountInfo,
        newsInfoReceiveFlg: !accountInfo.newsInfoReceiveFlg,
      });
      flg = !accountInfo.newsInfoReceiveFlg;
    } else if (id === "email-pcenter") {
      setAccountInfo({
        ...accountInfo,
        updateCenterReceiveFlg: !accountInfo.updateCenterReceiveFlg,
      });
      flg = !accountInfo.updateCenterReceiveFlg;
    } else if (id === "terms") {
      setTermsCheck(!isTermsCheck);
      flg = !isTermsCheck;
    } else {
      return;
    }
    const el = document.querySelector("#" + id);
    el.parentNode.style.backgroundColor = flg ? "#4dad5b" : "#313131";
  };

  // Continueボタン押下イベント
  const continueClickHanlder = () => {
    for (var item in accountInfo) {
      console.log(item);
      if (accountInfo[item] == "") {
        setError( {...error, item: accountInfo[item] } );
      }
      console.log(error);
    }
    navigate("/verifyemail");
  };

  /***** HTML ******/
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
                  <input type="text" css={customFormElements} maxLength={16} />
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
                  <p css={nameFieldDesc}>
                    Your username is the name you will use to log in to your
                    account. Only you will see this name.
                  </p>
                  {error.birthday != "" && <AlertSignUp />}
                </div>
                <label htmlFor="password">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Password
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                  <p css={nameFieldDesc}>
                    Your password must include at least one uppercase and one
                    lowercase letter, a number, and at least one other character
                    that is not a letter or digit, such as *, ', (, etc. We
                    recommend inserting numbers and symbols into the beginning,
                    middle, and end to make your password difficult to guess.
                  </p>
                </div>
                <label htmlFor="confirm_password">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Confirm Password
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                </div>
                <label htmlFor="email">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Email Address
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                  <p css={nameFieldDesc}>
                    Your Email will be used to verify your account.
                  </p>
                </div>
                <label htmlFor="confirm_email">
                  <MdOutlineCatchingPokemon css={requiredSVG} />
                  Confirm Email
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                </div>
                <div></div>
                <label style={{ width: "100%" }}>
                  I would like to receive email updates from The Pokémon Company
                  International regarding:
                </label>
                <div css={acceptInfo}>
                  <span>
                    <input type="checkbox" />
                    <span
                      css={[
                        checkBox,
                        boxGeneral(accountInfo.newsInfoReceiveFlg),
                      ]}
                    >
                      <GiCheckMark
                        id="email-general"
                        onClick={(e) => checkClickHandler(e)}
                      />
                    </span>
                  </span>
                  <label>News and information about Pokémon</label>
                </div>
                <div css={acceptInfo}>
                  <span>
                    <input type="checkbox" />
                    <span
                      css={[
                        checkBox,
                        boxPcenter(accountInfo.updateCenterReceiveFlg),
                      ]}
                    >
                      <GiCheckMark
                        id="email-pcenter"
                        onClick={(e) => checkClickHandler(e)}
                      />
                    </span>
                  </span>
                  <label>
                    News and updates about Pokémon Center (our official online
                    shop)
                  </label>
                </div>
                <div css={clear}></div>
                <div>
                  <p css={dispField}>
                    Do you want to display your Pokémon Trainer Club profile
                    publicly? This includes content such as your screen name.
                    Personal information such as your real name is always kept
                    private.
                  </p>
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
          <div css={acceptInfo}>
            <span>
              <input type="checkbox" />
              <span css={[checkBox, boxTerms(accountInfo.newsInfoReceiveFlg)]}>
                <GiCheckMark id="terms" onClick={(e) => checkClickHandler(e)} />
              </span>
            </span>
            <label> I accept the Pokemon.com Terms of Use. </label>
            <p style={{ paddingTop: "20px" }}>
              By continuing to use the Services, you acknowledge that you have
              rea, understood, and agree to our{" "}
              <a href="http://www.pokemon.com/us/terms-of-use/">Terms of Use</a>
              .
            </p>
          </div>
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
