/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  formWrapper,
  dogEarTl,
  fieldRequired,
  customScrollbar,
  customSelectMenu,
  customSelectWrapper,
  formField,
  submitButton,
  formInner,
  contentBlockFull,
  contentBlock,
  buttonBlack
} from "../../CommonCss/AccountCss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  column10,
  noPaddingTop,
  picker,
  pickerBox,
  pickerFooter,
  pickerFrame,
  pickerHeader,
  pickerHolder,
  pickerTable,
  pickerWrap,
  push2,
  section,
  viewport,
} from "../../CommonCss/Layout";
import { countryList } from "../../../constants/UlList";
import { useEffect, useRef, useState } from "react";
import {
  useInputAccountInfo,
  useSetInputAccountInfo,
} from "../../../contexts/SignupContext";
import AlertSignUp from "./AlertSignUp";
import { fieldInputEmptyCheck } from "../../CommonFunc/CommonAlert";
import { valid_message_birthdayNoValid } from "../../../constants/ValidationMessage";
import { getFullDate, toHalfWidth } from "../../CommonFunc/Common";

const VerifyAge = ({ Banner }) => {
  /***** CSS ******/
  // セクション下隙間補正
  const sectionUserAccount = css`
    padding-bottom: 60px;
  `

  // 誕生日欄INPUT
  const birthdayInput = css`
    background: #888;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 100%;
    font-family: "Roboto", arial, sans-serif;
    line-height: 1.5;
    padding: 0.5em 0;
    text-indent: 0.5em;
    width: 100%;
    height: auto;

    ::placeholder {
      color: #fff;
    }
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
      font-family: "Roboto", arial, sans-serif;
      font-weight: 500;
    }
  `;

  const linkLigInNow = css`
    font-size: 100% !important;
  `;

  const countryBar = (isListOpened) => css`
    height: 144px;
    display: ${isListOpened ? "block" : "none"};
  `;

  /***** context ******/
  const accountInfo = useInputAccountInfo();
  const setAccountInfo = useSetInputAccountInfo();

  /***** Definition ******/
  const insideRef = useRef();
  const documentClickHandler = useRef();
  const [isListOpened, setIsListOpened] = useState(false);
  const errorContentInit = { 
    birthday: ""
  };
  const [error, setError] = useState(errorContentInit);
  const navigate = useNavigate();

  /***** JS ******/
  // カスタムセレクトボックス外クリックで閉じる処理
  // useEffect(() => {
  //   documentClickHandler.current = (e) => {
  //     const tagJudgeSVG = e.target.tagName === "svg";
  //     const tagJudgePath = e.target.tagName === "path";

  //     if (insideRef.current.contains(e.target) || tagJudgeSVG || tagJudgePath)
  //       return;
  //     arrowOutsideClickHandler();
  //   };
  // }, []);

  // Countryリスト外押下イベント
  const arrowOutsideClickHandler = () => {
    setIsListOpened(false);
    document.removeEventListener("click", documentClickHandler.current);
  };

  // Countryリスト開閉イベント
  const arrowClickHandler = () => {
    setIsListOpened(!isListOpened);
    document.addEventListener("click", documentClickHandler.current);
  };

  // Country名選択イベント
  const countryItemClickHandler = (selList) => {
    const newAccountInfo = {
      ...accountInfo,
      country: { name: selList.name, value: selList.value },
    };
    setAccountInfo(newAccountInfo);
    sessionStorage.setItem('country', JSON.stringify(newAccountInfo.country));
    arrowClickHandler();
  };
  // Birth入力後チェンジイベント
  const birthdayChangeHandler = (e) => {
    const newAccountInfo = { ...accountInfo, birthday: e.target.value };
    setAccountInfo(newAccountInfo);
  };
  // Birth入力後フォーカスアウトイベント
  const birthdayBlurHandler = (e) => {
    const halvedVal = toHalfWidth(e.target.value);
    const date = new Date(halvedVal);
    if (!isNaN(date.getDate())) {
      const newDate = getFullDate(date);
      sessionStorage.setItem('birth', newDate);
      setAccountInfo({ ...accountInfo, birthday: newDate });
    } else {
      setAccountInfo({ ...accountInfo, birthday: "" });
    }
  }

  // Continueボタン押下イベント
  const continueClickHanlder = () => {
    // 入力エラーチェック
    const newError = fieldInputEmptyCheck(accountInfo, error) 
    if (isNaN(new Date(accountInfo.birthday).getDate())) {
      newError.birthday = valid_message_birthdayNoValid;
    }
    setError(newError);

    // エラーがなければAccount認証ページへ遷移
    Object.values(newError).forEach((val) => {
      if (val != "") {
        return;
      } else {
        navigate("/verifyaccount");
      }
    })
  };

  /***** HTML ******/
  return (
    <section css={[noPaddingTop, section, sectionUserAccount]}>
      <div css={[column10, push2]}>
        <div css={[contentBlockFull, contentBlock]}>
          <div css={[formWrapper, dogEarTl]}>
            <p css={fieldRequired}> ALL FIELDS ARE REQUIRED. </p>
            <form id="verify-age" css={formInner}>
              <label htmlFor="dob">Date of Birth</label>
              <div css={formField}>
                <input
                  id="id_dob"
                  type="text"
                  placeholder="yyyy-mm-dd"
                  onChange={(e) => birthdayChangeHandler(e)}
                  onBlur={(e) => birthdayBlurHandler(e)}
                  value={accountInfo.birthday}
                  css={birthdayInput}
                />
                <div css={picker}>
                  <div css={pickerHolder}>
                    <div css={pickerFrame}>
                      <div css={pickerWrap}>
                        <div css={pickerBox}>
                          <div css={pickerHeader}>
                            <div css={customSelectWrapper}></div>
                          </div>
                          <table css={pickerTable}></table>
                          <div css={pickerFooter}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {error.birthday != "" && <AlertSignUp error={error.birthday} />}
              </div>
              <label htmlFor="country">Country/Region</label>
              <div css={formField}>
                <div css={customSelectWrapper}>
                  <select id="country" style={{ display: "none" }}>
                    <option value="US">United States</option>
                  </select>
                  <div id="country-select" css={customSelectMenu} ref={insideRef}>
                    <label css={buttonBlack} onClick={() => arrowClickHandler()}>
                      {accountInfo.country.name}
                      {isListOpened ? (
                        <IoIosArrowUp viewBox="0 150 412 412"></IoIosArrowUp>
                      ) : (
                        <IoIosArrowDown viewBox="0 150 412 412"></IoIosArrowDown>
                      )}
                    </label>
                    <div css={[customScrollbar, countryBar(isListOpened)]}>
                      <div css={viewport}>
                        <ul>
                          {countryList.map((list) => (
                            <li
                              key={list.name}
                              onClick={() => countryItemClickHandler(list)}
                            >
                              {list.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input
                type="button"
                css={submitButton}
                value="Continue"
                onClick={() => continueClickHanlder()}
              ></input>
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
          <Banner icon={1}/>
        </div>
      </div>
    </section>
  );
};

export default VerifyAge;
