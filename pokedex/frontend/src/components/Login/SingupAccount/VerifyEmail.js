/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column10, push2, section } from "../../CommonCss/Layout";
import {
  contentBlock,
  contentBlockFull,
  dogEarTl,
  formWrapper,
} from "../../CommonCss/AccountCss";

const VerifyEmail = ({ Banner }) => {
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

  /***** HTML ******/
  return (
    <div css={section}>
      <div css={[column10, push2]}>
        <div css={[contentBlock, contentBlockFull]}>
          <div css={[formWrapper, dogEarTl]} style={{ minHeight: "290px" }}>
            <h3 css={customH3}> Hello! Thank you for creating an account! </h3>
            <p css={customP}>
              {" "}
              We have sent you a verification email. Please verify your account
              before logging in to the Pokémon Trainer Club.{" "}
            </p>
          </div>
          <Banner icon={2} />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
