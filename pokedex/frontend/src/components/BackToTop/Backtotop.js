/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const Backtotop = () => {
  /***** CSS ******/
  const visibleMobile = css`
    @media (min-width: 461px) and (max-width: 960px) {
      display: inherit !important;
    }
    @media (min-width: 961px) and (max-width: 9999px) {
      display: none !important;
    }
  `;

  const backToTop = css`
    background-color: #616161;
    border-color: #212121;
    border-radius: 10px 0 0 0;
    border-style: solid;
    border-width: 2px 0 0 2px;
    cursor: pointer;
    height: 64px;
    opacity: 0.6;
    /* position: fixed; */
    bottom: -68px;
    right: 0;
    width: 64px;
    z-index: 10;
    transition: all 0.2s linear;

    :before {
			content: "\f106";
      font-size: 200%;
      line-height: 64px;
      margin: 6px 0 0 0;
      text-align: center;
      width: 64px;
    }
  `;

	const offscreen = css`
		left: -99999px;
    position: absolute;
	`;

  /***** HTML ******/
  return (
    <div id="back-to-top" css={[visibleMobile, backToTop]}>
      <span css={offscreen}>Back To Top</span>
    </div>
  );
};

export default Backtotop;
