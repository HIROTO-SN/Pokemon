/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import {
  customScrollbar,
  customSelectMenu,
  customSelectWrapper,
  formField,
} from "../../CommonCss/AccountCss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { viewport } from "../../CommonCss/Layout";
import { countryList } from "../../../constants/UlList";
import { useEffect, useRef, useState } from "react";
import { useInputAccountInfo, useSetInputAccountInfo } from "../../../contexts/SignupContext";

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

    > label {
      clear: both;
      color: #212121;
      float: left;
      font-size: 120%;
      line-height: 100%;
      margin: 0.875em 0 0.5em 0;
      width: 38.4375%;
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

  /***** State/ref ******/
  const insideRef = useRef();
  const documentClickHandler = useRef();
  const [isListOpened, setIsListOpened] = useState(false);
  
  /***** JS ******/

  // カスタムセレクトボックス外クリックで閉じる処理
  useEffect(() => {
    
    documentClickHandler.current = e => {
      const tagJudgeSVG = e.target.tagName === "svg";
      const tagJudgePath = e.target.tagName === "path";

      if (insideRef.current.contains(e.target) || tagJudgeSVG || tagJudgePath) return
      arrowOutsideClickHandler();
    }
  },[]);

  const arrowOutsideClickHandler = () => {
    setIsListOpened(false);
    document.removeEventListener('click', documentClickHandler.current);
  }

  // Countryリスト開閉イベント
  const arrowClickHandler = () => {
    setIsListOpened(!isListOpened);
    document.addEventListener('click', documentClickHandler.current);
  };

  // Country名選択イベント
  const countryItemClickHandler = (selList) => {
    const newAccountInfo = {...accountInfo, country: { name: selList.name, value: selList.value} };
    setAccountInfo(newAccountInfo);
    arrowClickHandler();
  }

  /***** HTML ******/
  return (
    <div css={[formWrapper, dogEarTl]}>
      <p css={fieldRequired}>ALL FIELDS ARE REQUIRED.</p>
      <form id="verify-age" css={formInner}>
        <label htmlFor="dob">Date of Birth</label>
        <div css={formField}>
          <input id="id_dob" type="text" placeholder="yyyy-mm-dd" readOnly />
          <div></div>
        </div>
        <label htmlFor="country">Country/Region</label>
        <div css={formField}>
          <div css={customSelectWrapper}>
            <select id="country" style={{ display: "none" }}>
              <option value="US">United States</option>
            </select>
            <div id="country-select" css={customSelectMenu} ref={insideRef}>
              <label onClick={() => arrowClickHandler()}>
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
                      <li key={list.name} onClick={() => countryItemClickHandler(list)}>
                        {list.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <input type="hidden" id="hdn-country" value="US" />
            </div>
          </div>
        </div>
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
