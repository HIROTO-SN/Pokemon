/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FooterSignup from "./Footer-signup";

/**
 * ★Component★
 * Footer
 */
const Footer = () => {
  /***** Definition ******/
  const c = useCssFooter();

  /***** JSX ******/
  return (
    <footer css={c.globalFooter}>
      <div css={c.footerEmail}>
        <p css={c.footerEmailTitle}>Sign up for Pokémon&nbsp;emails!</p>
				<FooterSignup/>
      </div>
      <div></div>
    </footer>
  );
};

/**
 * CSS定義
 */
const useCssFooter = () => {
  const globalFooter = css`
    background: #1f1f1f;
    clear: both;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 1em;
    width: 100%;
  `;

  const footerEmail = css`
    font-family: "Roboto", arial, sans-serif;
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 850px;
    max-width: 1024px;
    margin: 4rem auto 2rem auto;
    color: white;
  `;

  const footerEmailTitle = css`
    font-family: "Roboto", arial, sans-serif;
    font-weight: bold;
    font-size: 135%;
    color: white;
    margin-bottom: 0;
    line-height: 125%;
    margin: 0.5em 0;
  `;
  return { globalFooter, footerEmail, footerEmailTitle };
};

export default Footer;
