/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const LoginForm = () => {
  /***** CSS ******/
  const sectionTitle = css`
    color: #919191;
    font-size: 150%;
    line-height: 125%;
    margin: 1em 0.5em 0.5em 0em;
  `;
  const dogEarBl = css``;
  return (
    <>
      <h2 css={sectionTitle}> Log In </h2>
    </>
  );
};

export default LoginForm;
