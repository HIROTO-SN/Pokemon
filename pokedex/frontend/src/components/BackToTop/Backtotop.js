/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IoIosArrowUp } from "react-icons/io";
import { useLoadFlg, useSetLoadFlg } from "../../contexts/LoadContext";

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
    margin-left: 100px; /* 後で消す */
    bottom: -68px;
    right: 0;
    width: 64px;
    z-index: 10;
    transition: all 0.2s linear;
  `;

  // iconの位置調整
  const iconPosition = css`
    cursor: pointer;
    margin: 6px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const icon = css`
    font-size: 320%;
  `;

  const offscreen = css`
    left: -99999px;
    position: absolute;
  `;

  /***** Definition ******/
  const loadFlg = useLoadFlg();

  /***** JS ******/
  const scrollOnTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };

  /***** JSX ******/
  return (
    <>
      {loadFlg && (
        <div
          id="back-to-top"
          css={[visibleMobile, backToTop]}
          onClick={() => scrollOnTop()}
        >
          <label css={iconPosition}>
            <IoIosArrowUp css={icon} />
          </label>
          <span css={offscreen}>Back To Top</span>
        </div>
      )}
    </>
  );
};

export default Backtotop;
