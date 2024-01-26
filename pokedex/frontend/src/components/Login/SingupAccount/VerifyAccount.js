/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  useInputAccountInfo,
  useSetInputAccountInfo,
} from "../../../contexts/SignupContext";
import {
  buttonCustom,
  buttonLightblue,
  buttonRight,
  contentBlock,
  contentBlockFull,
  customFormElements,
  dogEarTl,
  fieldRequired,
  formField,
  formInner,
  formWrapper,
} from "../../CommonCss/AccountCss";
import { column10, noPaddingTop, push2, section } from "../../CommonCss/Layout";
import { MdOutlineCatchingPokemon } from "react-icons/md";


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
		font-family: "Roboto",arial,sans-serif;
		font-weight: 500;
    line-height: 125%;
	`
  // チェックボックス加工DIV用
	const acceptInfo = css`
		float: left;
    margin: 1em 0;
    position: relative;
    width: 100%;
	`

  /***** context ******/
  const accountInfo = useInputAccountInfo();
  const setAccountInfo = useSetInputAccountInfo();

  /***** JS ******/

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
                  <input type="text" css={customFormElements} maxlength="16" />
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
                </div>
                <label htmlFor="password">
									<MdOutlineCatchingPokemon />
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
									<MdOutlineCatchingPokemon />
                  Confirm Password
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                </div>
                <label htmlFor="email">
									<MdOutlineCatchingPokemon />
                  Email Address
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
									<p css={nameFieldDesc}>
										Your Email will be used to verify your account.
									</p>
                </div>
                <label htmlFor="confirm_email">
									<MdOutlineCatchingPokemon />
                  Confirm Email
                </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                </div>
                <div></div>
                <label style={{width: "100%"}}>
                  I would like to receive email updates from The Pokémon Company
                  International regarding:
                </label>
                <div css={acceptInfo}>
                  <span>
                    <input type="checkbox" />
                    <span></span>
                  </span>
                  <label> News and information about Pokémon </label>
                </div>
                <div css={acceptInfo}>
                  <span>
                    <input type="checkbox" />
                    <span></span>
                  </span>
                  <label>
                    {" "}
                    News and updates about Pokémon Center (our official online
                    shop){" "}
                  </label>
                </div>
                {/* <div>
                  <p>
                    Do you want to display your Pokémon Trainer Club profile
                    publicly? This includes content such as your screen name.
                    Personal information such as your real name is always kept
                    private.
                  </p>
                  <p>
                    <input type="radio" name="public_profile_opt_in" />
                    Yes
                  </p>
                  <p>
                    <input type="radio" name="public_profile_opt_in" />
                    No
                  </p>
                </div> */}
                <label htmlFor="screen_name"> Screen Name </label>
                <div css={formField}>
                  <input type="text" css={customFormElements} />
                  <p></p>
                  <input />
                </div>
              </div>
            </div>
            <Banner />
          </div>
        </div>
      </fieldset>
      <fieldset></fieldset>
    </form>
  );
};

export default VerifyAccount;
