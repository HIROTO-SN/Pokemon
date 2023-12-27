import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import ProfileForPC from "./DashContent/ProfileForPC";

const UserDashboard = () => {
	
  // const dashboard = css`
	// 	/* @media (min-width: 961px) {
	// 		top: 161px;
	// 	} */
	// 	/* position: fixed;
  //   left: 0;
  //   top: 161px;
  //   width: 59px;
  //   max-width: 1280px;
  //   height: 100%;
  //   z-index: 17;
  //   overflow: hidden; */
	// `;

  // const defaultBackground = css`
  //   /* @media (min-width: 961px) and (max-width: 1281px) {
  //     left: 50%;
  //     margin-left: -640px;
  //   } */
  // `;

  return (
    <div id="user-dashboard">
      <div>
        <ProfileForPC />
        <UserDashboard />
      </div>
    </div>
  );
};

export default UserDashboard;
