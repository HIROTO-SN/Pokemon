/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ContentBase from "./ContentBase";
import ContentMainTitle from "./ContentMain-title";
import ContentMainHello from "./ContentMain-Hello";

const AccountEmailTemp = () => {
  /***** CSS ******/
  const main = css`
    margin: 8px 0 0 0;
    overflow-x: hidden;
    padding: 0;
    font-size: 0.875rem;
    direction: ltr;
    position: relative;
  `;

  const a3s = css`
    direction: initial;
    font: small / 1.5 Arial, Helvetica, sans-serif;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
  `;

  const main_table = css`
    min-width: 600px;
    text-align: center;
  `;

  /***** JSX ******/
  return (
    <div css={main}>
      <div css={a3s}>
        <table css={main_table} border="0">
          <tbody>
            <tr>
              <ContentBase fontSize="86px">
                <ContentMainTitle />
              </ContentBase>
            </tr>
            <tr>
              <ContentBase fontSize="86px">
                <ContentMainHello />
              </ContentBase>
            </tr>
            <tr>test</tr>
            <tr>test</tr>
            <tr>test</tr>
            <tr>test</tr>
            <tr>test</tr>
            <tr>test</tr>
            <tr>test</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountEmailTemp;
