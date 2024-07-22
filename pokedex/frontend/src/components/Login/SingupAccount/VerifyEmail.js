/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useLayoutEffect, useState } from "react";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  ACTIVATED_ACCOUNT,
  CREATE_ACCOUNT,
} from "../../../constants/ConstantsGeneral";
import { REGEX_ACTIVATION } from "../../../constants/ValidationMessage";
import { useLoadFlg, useSetLoadFlg } from "../../../contexts/LoadContext";
import {
  useInputAccountInfo,
  useSetInputAccountInfo,
} from "../../../contexts/SignupContext";
import Load from "../../../features/Pokedex/components/Results/Load";
import { capitalizeFirstLetter } from "../../../features/Pokedex/utils/ConvToolUtils";
import {
  contentBlock,
  contentBlockFull,
  customFormElements,
  dogEarTl,
  formField,
  formWrapper,
  requiredSVG,
  submitButton,
} from "../../CommonCss/AccountCss";
import { column10, push2, section } from "../../CommonCss/Layout";
import { isStrEmptyOrNull } from "../../CommonFunc/Common";
import { fieldInputEmptyCheck } from "../../CommonFunc/CommonAlert";
import { chkToken, verifyEmail } from "../../api/SignUpApi";
import AlertSignUp from "./AlertSignUp";

const VerifyEmail = ({ Banner }) => {
  /***** CSS ******/

  /***** Definition ******/
  const loadFlg = useLoadFlg();
  const setloadFlg = useSetLoadFlg();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [pageType, setPageType] = useState("");

  /***** JS ******/
  useLayoutEffect(() => {
    // トークン認証
    const chkTokenAvailablility = async () => {
      const isTokenAvailable = await chkToken(token);
      isTokenAvailable ? setPageType("activated") : setPageType("re-activate");
      setloadFlg(true);
    };
    if (token) {
      chkTokenAvailablility(token);
    } else {
      setPageType("verify");
      setloadFlg(true);
    }
  }, []);

  if (!loadFlg) {
    return <Load />;
  }

  /***** JSX ******/
  return (
    loadFlg && (
      <div css={section}>
        <div css={[column10, push2]}>
          {pageType === "re-activate" ? (
            <ReActivate />
          ) : (
            <Activate pageType={pageType} Banner={Banner} />
          )}
        </div>
      </div>
    )
  );
};

/**
 * メール再認証用JSX
 */
const Activate = ({ pageType, Banner }) => {
  /***** CSS ******/
  const customH3 = css`
    padding-bottom: 0.5em;
    margin: 0.75em 0.5em 0 1em;
    font-size: 137.5%;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Medium", arial, sans-serif;
  `;
  const customP = css`
    margin-bottom: 0.75em;
    margin-left: 1.25em;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
    color: #313131;
    font-family: "Exo", arial, sans-serif;
    min-height: 146px;
  `;
  const customButton = css`
    float: left;
    margin-left: 1.25em;
    padding-right: 2.75em;
    padding-left: 2.75em;
    background-color: #ee6b2f;
    :hover {
      background-color: #e4520f;
    }
  `;
  /***** Definition ******/

  /***** JS ******/

  /***** JSX ******/
  return (
    <div css={[contentBlock, contentBlockFull]}>
      <div css={[formWrapper, dogEarTl]} style={{ minHeight: "290px" }}>
        <h3 css={customH3}>
          {pageType === "activated"
            ? ACTIVATED_ACCOUNT.TITLE
            : CREATE_ACCOUNT.TITLE}
        </h3>
        <p css={customP}>
          {pageType === "activated"
            ? ACTIVATED_ACCOUNT.CONTENT
            : CREATE_ACCOUNT.CONTENT}
        </p>
        {pageType === "activated" && (
          <Link to="../Login" type="button" css={[submitButton, customButton]}>
            Login
          </Link>
        )}
      </div>
      <Banner icon={2} />
    </div>
  );
};

/**
 * メール再認証用JSX
 */
const ReActivate = () => {
  /***** CSS ******/
  const H2 = styled.h2`
    color: #919191;
    font-size: 150%;
    line-height: 125%;
    margin: 1em 0.5em 0.5em 0em;
  `;
  const Remarks = styled.p`
    color: #919191;
    font-family: "Roboto", arial, sans-serif;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
    margin: 0.5em 0;
  `;

  /***** Definition ******/
  const accountInfo = useInputAccountInfo();
  const urlParams = new URLSearchParams(window.location.search);
  const errorContentInit = {
    username: "",
    password: "",
    email: "",
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /***** JS ******/
  /**
   * Continueボタン押下処理
   */
  const continueClickHanlder = () => {
    // 入力チェック（Inputが空かどうか）
    let newError = fieldInputEmptyCheck(accountInfo, errorContentInit);

    // 本画面ではエラーは1つずつ表示する
    if (isStrEmptyOrNull(newError.email) && chkInput(accountInfo.email)) {
      setError({ email: chkInput(accountInfo.email) });
      return;
    }
    if (!isStrEmptyOrNull(newError.email)) {
      setError({ email: newError.email });
      return;
    } else if (!isStrEmptyOrNull(newError.username)) {
      setError({ username: newError.username });
      return;
    } else if (!isStrEmptyOrNull(newError.password)) {
      setError({ password: newError.password });
      return;
    } else {
      setError("");
    }
    verifyEmail(accountInfo, urlParams.get("token"));
    navigate("/verifyaccount/3");
    window.location.reload();
  };

  /**
   * 入力チェック
   */
  const chkInput = (val) => {
    for (const r of REGEX_ACTIVATION) {
      if (!r.REGEX.test(val)) {
        return r.MSG;
      }
    }
    return null;
  };

  /**
   * emailインプットフォーカスアウト処理
   * @param {Object} e 入力値
   */
  const onBlurEmail = (e) => {
    setError("");
    e && setError({ email: chkInput(e.target.value) });
  };

  /***** JSX ******/
  return (
    <>
      <H2>Resend your activation email</H2>
      <Remarks>
        We cannot find an account matching the confirmation email. Please verify
        that the URL from the parental consent email has been entered correctly.
      </Remarks>
      <fieldset css={section} style={{ marginBottom: "60px" }}>
        <div css={[column10, push2]}>
          <H2>Activation Code Request</H2>
          <LabelInputSet
            type="email"
            error={error.email}
            setError={onBlurEmail}
          />
          <LabelInputSet
            type="username"
            error={error.username}
            setError={setError}
          />
          <LabelInputSet
            type="password"
            error={error.password}
            setError={setError}
          />
          <input
            type="button"
            css={submitButton}
            value="Continue"
            style={{ margin: "0" }}
            onClick={() => continueClickHanlder()}
          ></input>
        </div>
      </fieldset>
    </>
  );
};

/**
 * ラベルとインプット要素セット
 */
const LabelInputSet = ({ type, error, setError }) => {
  /***** CSS ******/
  const Lal = styled.label`
    clear: both;
    color: #212121;
    float: left;
    font-size: 120%;
    line-height: 100%;
    margin: 0.875em 0 0.5em 0;
    width: 38.4375%;
  `;

  /***** Definition ******/
  const accountInfo = useInputAccountInfo();
  const setAccountInfo = useSetInputAccountInfo();

  /***** JS ******/
  /**
   * 入力値変更処理
   * @param {Object} e
   */
  const onChangeHandler = (e) => {
    switch (type) {
      case "email": {
        setAccountInfo({ ...accountInfo, email: e.target.value });
        break;
      }
      case "username": {
        setAccountInfo({ ...accountInfo, username: e.target.value });
        break;
      }
      case "password": {
        setAccountInfo({ ...accountInfo, password: e.target.value });
        break;
      }
    }
  };

  /***** JSX ******/
  return (
    <>
      <Lal>
        <MdOutlineCatchingPokemon css={requiredSVG} />
        {capitalizeFirstLetter(type)}
      </Lal>
      <div css={formField}>
        <input
          type={type === "password" ? "password" : "text"}
          css={customFormElements}
          onChange={(e) => onChangeHandler(e)}
          onInput={() => setError("")}
          onBlur={type === "email" ? (e) => setError(e) : () => setError("")}
        ></input>
        {error && <AlertSignUp error={error} position="absolute" />}
      </div>
    </>
  );
};
export default VerifyEmail;
