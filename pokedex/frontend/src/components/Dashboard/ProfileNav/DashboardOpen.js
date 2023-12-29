/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const DashboardOpen = () => {
  /***** CSS ******/
  /* 共通タグ定義 */
  const DashList = styled.li`
    cursor: pointer;
    display: none;
    float: left;
    margin: 0;
    position: relative;
    width: 57px;
    text-align: center;

    > a {
      color: #fff;
      text-align: center;
      text-transform: none;
      text-decoration: none;
      -webkit-tap-highlight-color: transparent;
    }
  `;

  /* Log in 部 */
  const visibleNotSignedIn = css`
    display: block;
  `;
  // ログイン時
  const singUp = css`
    font-family: "Flexo-Bold", arial, sans-serif;
    background-color: #54b564;
    font-size: 87.5%;
    line-height: 90%;

    :hover {
      background-color: #369143;
    }

    // 上部のレイアウト部
    :after {
      background: transparent url("./background/profile-nav-bg.png") left -51px;
      content: " ";
      display: block;
      height: 17px;
      left: 0;
      opacity: 0;
      position: absolute;
      top: -17px;
      width: 100%;
    }
    :hover::after {
      opacity: initial;
    }
    
    span {
      padding-bottom: 1.3em;
      display: block;
      margin: 25% 0;
    }

    img {
      margin-bottom: 0.25em;
    }
  `;
  // アイコンDIV
  const avatarIconWrapper = css`
    border-radius: 17px 17px 17px 17px;
    background: #4dad5b;
    width: 30px;
    height: 30px;
    margin: 2px auto;
  `;
  // アイコンイメージ部
  const avatarIcon = css`
    width: 35px;
    height: 35px;
    margin: -3px 0 0 -3px;
  `;
  // アイコンテキスト
  const signInTextWrapper = css`
    padding: 0.5px 0 0;
  `;

  const visibleSignedIn = css``;
  const organizerLink = css``;
  const signIn = css`
    line-height: 2em;
    font-size: 81.25%;
    font-family: "Flexo-Bold", arial, sans-serif;
  `;

  /***** JS ******/

  /***** HTML ******/
  return (
    <>
      <DashList css={[visibleNotSignedIn, singUp]}>
        <Link to="/login">
          <span>
            <div css={avatarIconWrapper}>
              <img
                css={avatarIcon}
                src="./icons/profile-nav-signup.png"
                alt="Log In"
              />
            </div>
            <div css={signInTextWrapper}> Log In </div>
          </span>
        </Link>
      </DashList>
      <DashList css={visibleSignedIn}></DashList>
      <DashList css={[visibleSignedIn, organizerLink]}></DashList>
      <DashList
        id="sidebar-logout-button"
        css={[visibleSignedIn, signIn]}
      ></DashList>
    </>
  );
};

export default DashboardOpen;
