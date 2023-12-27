/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Dashboard from "./Dashboard";
import DashboardOpen from "./ProfileNav/DashboardOpen";
import DashSearch from "./ProfileNav/DashSearch";

const UserDashboard = () => {
  const userDashboard = css`
    top: 161px;
    left: 0;
    position: fixed;
    width: 59px;
    max-width: 1280px;
    height: 100%;
    z-index: 17;
    overflow: hidden;

    @media (min-width: 1281px) and (max-width: 9999px) {
      left: 50%;
      margin-left: -640px;
    }
  `;

  const drawer = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: translate(-100%, 0%);
  `;

  const profileNav = css`
    left: 100%;
    position: absolute;
    padding-top: 1em;
    width: 59px;
  `;

  const dashboardOpen = css`
    background-image: url("./background/profile-nav-repeat-bg.png");
    background-repeat: repeat-y;
    float: left;
    margin-top: 15px;
    position: relative;
    width: 100%;
    cursor: pointer;
    list-style: none;

    :before {
      content: " ";
      display: block;
      height: 17px;
      left: 0;
      opacity: 1;
      position: absolute;
      top: -17px;
      width: 100%;
    }
  `;

  const hiddenModile = css`
    @media (min-width: 1281px) and (max-width: 9999px) {
      display: inherit !important;
    }
  `;

  const notSignedIn = css`
    min-height: 84.25px;

    :before {
      background: transparent url("./background/profile-nav-bg.png") left -34px;
    }
  `;

  return (
    <div css={userDashboard}>
      <div css={drawer}>
        <nav css={[profileNav, hiddenModile]}>
          <ul css={[dashboardOpen, notSignedIn]}>
            <DashboardOpen />
            <DashSearch />
          </ul>
        </nav>
        <Dashboard />
      </div>
    </div>
  );
};

export default UserDashboard;
