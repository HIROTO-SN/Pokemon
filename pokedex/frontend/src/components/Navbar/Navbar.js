import Hamburger from "./NavContent/Hamburger";
import PrimaryNav from "./NavContent/PrimaryNav";
import "./Navbar.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


const Navbar = () => {
  return (
    <nav css={main}>
      <div className="blocker"></div>
      <div css={contentWrapper}>
        <Hamburger />
        <PrimaryNav />
      </div>
    </nav>
  ); 
};

const main = css`
  background-color: #fff;
  border-bottom: 2px solid #f0f0f0;
  height: 87px;
  width: 100%;
  z-index: 10;
`;

const contentWrapper =css`
  max-width: 895px;
  overflow: visible;
  background: transparent url("../../../public/background/stripe.jpg");
  background-size: 100% 1px;
  display: block;
  margin: 0 auto;
  width: 100%;

  >ul {
    display: unset;
    overflow: visible;
    list-style: none;
  }
  >ul li {
    cursor: pointer;
    float: left;
    height: 87px;
    margin: 0;
    overflow: visible;
    position: relative;
    width: 14.28571%;
  }
`

export default Navbar;
