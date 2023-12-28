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
  `;

  /* Log in 部 */
  const visibleNotSignedIn = css`
    display: block;
  `;

  const singUp = css`
    font-family: "Flexo-Bold", arial, sans-serif;
    background-color: #54b564;
    font-size: 87.5%;
    line-height: 90%;

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
  `;
  const visibleSignedIn = css``;
  const organizerLink = css``;
  const signIn = css`
		line-height: 2em;
    font-size: 81.25%;
    font-family: "Flexo-Bold",arial,sans-serif;
	`;

  /***** JS ******/
	
  /***** HTML ******/
  return (
    <>
      <DashList css={[visibleNotSignedIn, singUp]}>
        <Link to="/login">
          <span>
            <div>
              <img/>
            </div>
          </span>
        </Link>
      </DashList>
      <DashList css={visibleSignedIn}></DashList>
      <DashList css={[visibleSignedIn, organizerLink]}></DashList>
      <DashList id="sidebar-logout-button" css={[visibleSignedIn, signIn]}></DashList>
    </>
  );
};

export default DashboardOpen;
