/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLoadFlg } from "../../../../contexts/LoadContext";

/**
 * ★Component★
 * Footerとコンテントの隙間調整用
 */
const FooterDivider = () => {
  /***** CSS ******/
  const footerDivider = css`
    clear: both;
    display: block;
    height: 36px;
    margin: 0 auto;
    max-width: 1024px;
    width: 100%;
  `;

  const footerNotch = css`
    float: left;
    margin-right: -100%;
    width: 85.49%;
    margin-left: 7.2525%;
    background-color: #fff;
    height: 6px;
    position: relative;

    ::before {
      content: "";
      height: 6px;
      position: absolute;
      bottom: 0;
      width: 12px;
      background: transparent url("../notches/notch-top-left.png") no-repeat;
      left: -11px;
    }

    ::after {
      content: "";
      height: 6px;
      position: absolute;
      bottom: 0;
      width: 12px;
      background: transparent url("../notches/notch-top-right.png") no-repeat;
      right: -11px;
    }
  `;

  /***** Definition ******/
  const loadFlg = useLoadFlg();

  /***** JSX ******/
  return (
    <>
      {loadFlg && (
        <div css={footerDivider}>
          <span css={footerNotch}></span>
        </div>
      )}
    </>
  );
};

export default FooterDivider;
