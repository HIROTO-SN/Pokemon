/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useReducer, useState } from "react";
import { customFormElements } from "../../../../components/CommonCss/AccountCss";
import { TODAY } from "../../../../constants/ConstantsGeneral";
import { countryList } from "../../../../constants/ul_list/accountList";
import { emailCheck } from "../../../../components/CommonFunc/CommonAlert";

const FooterSignup = () => {
  /***** Definition ******/
  const inputInit = {
    email: "",
    country: countryList[0].value,
    birthday: "",
    appsCheck: false,
    pcCheck: false,
    termsCheck: false,
  };
  const c = useCssFooterSignup();
  const [emailErrorFlg, setEmailErrorFlg] = useState(false);
  const [birthdayErrorFlg, setbirthdayErrorFlg] = useState(false);
  const [submitValid, submitValidDispatch] = useReducer((_, newState) => {
		let flg = true;
		Object.values(newState).forEach((val) => {
			if (!val) {
				flg = false;
			}
		});
		return flg;
	}, false);
  const [inputState, inputDispatch] = useReducer((state, action) => {
		let newState;
    switch (action.type) {
      case "email":
				newState = { ...state, email: action.val };
        break;
      case "country":
				newState = { ...state, country: action.val };
				break;
      case "birthday":
				newState = { ...state, birthday: action.val };
        break;
      case "appsCheck":
				newState = { ...state, appsCheck: action.val };
        break;
      case "pcCheck":
				newState = { ...state, pcCheck: action.val };
        break;
      case "termsCheck":
				newState = { ...state, termsCheck: action.val };
        break;
			default: 
				return inputState;
    }

		submitValidDispatch(newState);
		return newState;

  }, inputInit);

  /***** JS ******/
  useEffect(() => {
    const el = document.querySelector("#email-signup-button");
    el.disabled = true;
  }, []);

  /**
   * email, birthday テキストフォーカスアウト処理
   * @param {Event} e - Eventオブジェクト
   */
  const onBlurHandler = (e, set) => {
    if (e.target.value === "") {
      set(true);
    } else {
			if (e.target.id === "email") {
				// メール形式で問題があればフラグを立ててreturn
				if (emailCheck(e.target.value)) {
					set(true);
				} else {
					set(false);	
				}
			} else {
				set(false);
			}
    }
  };

  /**
   * birthday テキストフォーカスイン処理
   * @param {Event} e - Eventオブジェクト
   */
  const onBirthdayFocus = (e) => {
    const el = e.target;
    el.type = "date";
  };

  /**
   * Input全般のchangeイベント
   * @param {Event} e - Eventオブジェクト
   */
  const onInputChange = (e) => {
    const el = e.target;
    inputDispatch({
      type: el.id,
      val: el.type !== "checkbox" ? el.value : el.checked,
    });

  };
  console.log(inputState);
	console.log(submitValid);

  /***** JSX ******/
  return (
    <div>
      <div css={c.email_container}>
        <div css={c.email_form}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            css={[
              customFormElements,
              c.footer_white_box,
              c.errorBox(emailErrorFlg),
            ]}
            onBlur={(e) => {onBlurHandler(e, setEmailErrorFlg)}}
            onChange={(e) => onInputChange(e)}
          ></input>
          <div css={c.region_dob_wrap}>
            <select
              id="country"
              css={[
                customFormElements,
                c.footer_white_box,
                c.footer_region_select,
              ]}
              onChange={(e) => onInputChange(e)}
            >
              {countryList.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
            <input
              id="birthday"
              type="text"
              placeholder="Birthday"
              title="Birthday"
              css={[
                customFormElements,
                c.footer_white_box,
                c.footer_email_input,
                c.errorBox(birthdayErrorFlg),
              ]}
              onBlur={(e) => {
                e.target.type = "text";
                onBlurHandler(e, setbirthdayErrorFlg);
              }}
              onFocus={(e) => onBirthdayFocus(e)}
              onChange={(e) => onInputChange(e)}
              max={TODAY.DATE}
            />
          </div>
        </div>
        <div css={c.email_notification_form}>
          <p>I'd like to receive emails&nbsp;about:</p>
          <div css={c.email_checkbox_wrapper}>
            <input
              id="appsCheck"
              type="checkbox"
              value="pokemon_news"
              css={c.footer_email_checkbox}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label htmlFor="email-signup-vg-apps">
              {" "}
              Pokémon video games, apps, and&nbsp;more
            </label>
          </div>
          <div css={c.email_checkbox_wrapper}>
            <input
              id="pcCheck"
              type="checkbox"
              value="pcenter"
              css={c.footer_email_checkbox}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label htmlFor="email-signup-pc">
              {" "}
              Pokémon Center (our official&nbsp;online shop)
            </label>
          </div>
          <div css={c.email_checkbox_wrapper}>
            <input
              id="termsCheck"
              type="checkbox"
              value="terms"
              css={c.footer_email_checkbox}
              onChange={(e) => onInputChange(e)}
            ></input>
            <label htmlFor="email-signup-terms">
              {" "}
              I accept the Pokemon.com{" "}
              <a
                css={c.footer_email_link}
                href="https://www.pokemon.com/us/terms-of-use"
              >
                Terms&nbsp;of&nbsp;Use
              </a>
              <a
                css={c.footer_email_link}
                href="https://www.pokemon.com/us/privacy-notice"
              >
                Privacy&nbsp;Policy
              </a>
            </label>
          </div>
        </div>
      </div>
      <input
        id="email-signup-button"
        css={c.signup_button(submitValid)}
        type="button"
        value="SIGN UP"
      />
    </div>
  );
};

/**
 * CSS定義
 */
const useCssFooterSignup = () => {
  // インプット部囲い
  const email_container = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const email_form = css`
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  `;

  const footer_white_box = css`
    background-color: white !important;
    color: grey !important;
    font-weight: bold;
    ::-webkit-calendar-picker-indicator {
      display: none;
    }
  `;

  const region_dob_wrap = css`
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
  `;

  const footer_region_select = css`
    appearance: menulist;
    background: #313131;
    min-width: 48%;
    height: revert !important;
    background-color: white !important;
    color: grey !important;
    font-weight: bold;
  `;

  const footer_email_input = css`
    min-width: 48%;
    background-color: white !important;
    color: grey !important;
    font-weight: bold;
  `;

  const email_notification_form = css`
    width: 48%;
    > p {
      margin-top: 0;
      color: white;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      font-weight: 500;
      line-height: 125%;
      margin: 0.5em 0;
    }
  `;

  const email_checkbox_wrapper = css`
    display: flex;
    column-gap: 1rem;
    margin-top: 0.5rem;
    align-items: center;
  `;

  const footer_email_checkbox = css`
    appearance: auto;
    position: relative;
    opacity: 1;
    width: 25px;
    height: 25px;
    min-width: 25px;
    min-height: 25px;
    outline: none;
    left: 0;
    top: 0;
    padding: 0;
    border: none;
    margin: 0;
    z-index: 2;
  `;

  /**
   * Email欄エラー時枠色付け
   * @param {Boolean} errorFlg - エラー判定フラグ
   */
  const errorBox = (errorFlg) => css`
    ${errorFlg && "border: 5px solid red !important"};
  `;

  /**
   * @param {Boolean} activeFlg - ボタン活性、非活性フラグ
   */
  const signup_button = (activeFlg) => css`
    background-color: ${activeFlg ? "#51700f" : "grey"};
    cursor: ${activeFlg ? "pointer" : "not-allowed"};
    font-family: "Roboto", arial, sans-serif;
    width: 10rem;
    height: 4rem;
    font-size: 100%;
    font-weight: bold;
    color: white;
    margin-top: 5px;
    border-radius: 5px;

		:hover {
			background-color:${activeFlg && "#4a650f" }
		}
  `;

  return {
    email_container,
    email_form,
    errorBox,
    footer_white_box,
    region_dob_wrap,
    footer_region_select,
    footer_email_input,
    email_notification_form,
    email_checkbox_wrapper,
    footer_email_checkbox,
    signup_button,
  };
};

export default FooterSignup;
