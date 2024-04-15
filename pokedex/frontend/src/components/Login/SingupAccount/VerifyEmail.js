/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  ACTIVATED_ACCOUNT,
  CREATE_ACCOUNT,
} from "../../../constants/ConstantsGeneral";
import {
  contentBlock,
  contentBlockFull,
  dogEarTl,
  formWrapper,
  submitButton,
} from "../../CommonCss/AccountCss";
import { column10, push2, section } from "../../CommonCss/Layout";
import { Link } from "react-router-dom";

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const [pageType, setPageType] = useState("verify");

  /***** JS ******/
  useEffect(() => {
    if (token) {
      setPageType("activate");
    }
  }, []);

  /***** JSX ******/
  return (
    <div css={section}>
      <div css={[column10, push2]}>
        <div css={[contentBlock, contentBlockFull]}>
          <div css={[formWrapper, dogEarTl]} style={{ minHeight: "290px" }}>
            <h3 css={customH3}>
              {pageType === "activate"
                ? ACTIVATED_ACCOUNT.TITLE
                : CREATE_ACCOUNT.TITLE}
            </h3>
            <p css={customP}>
              {pageType === "activate"
                ? ACTIVATED_ACCOUNT.CONTENT
                : CREATE_ACCOUNT.CONTENT}
            </p>
            {pageType === "activate" && (
              <Link
                to="../Login"
                type="button"
                css={[submitButton, customButton]}
              >Login</Link>
            )}
          </div>
          <Banner icon={2} />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
