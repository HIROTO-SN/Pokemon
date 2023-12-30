/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DashSearch = () => {
  /***** CSS ******/
  /* searchスタイル */
  const search = css`
    transition: background-image 0.2s;
    background-image: url("./background/profile-nav-search-bg.png");
    float: left;
    height: 67px;
    margin-top: 0;
    width: 59px;

    :hover {
      background-image: url("./background/profile-nav-search-bg-hover.png");
    }
  `;

  const iconSearch = css`
    color: #fff;
    font-size: 175%;
    height: 67px;
    line-height: 67px;
    display: block;
    float: left;
    font-weight: 500;
    text-align: center;
    text-transform: none;
    width: 100%;
    cursor: pointer;
  `;

  const offScreen = css`
    left: -99999px;
    position: absolute;
  `;

  /***** JS ******/
  /***** HTML ******/
  return (
    <div css={search}>
      <a css={iconSearch}>
        <img src="./icons/search.png" height="30%"/>
        <span css={offScreen}></span>
      </a>
    </div>
  );
};

export default DashSearch;
