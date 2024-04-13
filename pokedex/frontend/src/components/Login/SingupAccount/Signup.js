/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  colorBlack,
  column10,
  container,
  hiddenMobile,
  push2,
  section,
  visibleMobile,
} from "../../CommonCss/Layout.js";
import StepsMenu from "./Signup-stepsmenu.js";
import { InputAccountInfoProvider } from "../../../contexts/SignupContext.js";
import VerifyAge from "./VerifyAge.js";
import CreateAccount from "./VerifyAccount.js";
import VerifyEmail from "./VerifyEmail";
import { useParams } from "react-router";

const Signup = () => {
  /***** CSS ******/
  const useraccount = css`
    position: relative;
  `;

  const pageMainTitle = css`
    color: #999999;
    margin: 0;
    margin-left: 7.2525%;
    font-size: 175%;
    cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;

    @media (min-width: 461px) and (max-width: 960px) {
      background: #30a7d7;
      color: white;
      text-align: left;
      margin: 0;
      padding: 1em 0.5em;
      position: relative;
    }
    @media (min-width: 961px) and (max-width: 9999px) {
      margin-top: 1em;
      margin-bottom: 1em;
    }
  `;

  const pageSubTitle = css`
    color: #919191;
    font-size: 150%;
    line-height: 125%;
    margin: 1em 0.5em 0.5em 7.2525%;
  `;

  const notchBottomRightSmall = css`
    width: 30%;
    backface-visibility: hidden;
    background: #fff;
    float: left;
    height: 8px;
    margin: -6px 0 0 57.5%;
    position: relative;

    :before {
      left: -10px;
      background: transparent url("../background/left-notch-bottom-right.png")
        no-repeat;
      background-size: 12px 8px;
      backface-visibility: hidden;
      top: 0;
      content: " ";
      height: 8px;
      position: absolute;
      width: 12px;
    }
    :after {
      right: -10px;
      background: transparent url("../background/right-notch-bottom-right.png")
        no-repeat;
      background-size: 12px 8px;
      backface-visibility: hidden;
      top: 0;
      content: " ";
      height: 8px;
      position: absolute;
      width: 12px;
    }
  `;

  /***** Definition ******/
  const params = useParams();
  const { pageNo } = useParams();
  console.log("pageNo: " + pageNo);
  console.log("params: " + params);

  /***** JSX ******/
  return (
    <div css={[container]}>
      <section css={[section, useraccount]}>
        <h1 css={pageMainTitle}>Create Your Pokémon Trainer Club Account</h1>
        <span css={[notchBottomRightSmall, visibleMobile]}></span>
        <h2 css={[pageSubTitle, visibleMobile]}>Verify Age</h2>
        <div css={[column10, push2, hiddenMobile]}>
          <StepsMenu pageNo={Number(pageNo)} />
        </div>
      </section>
      <div css={colorBlack}>
        <InputAccountInfoProvider>
          <PageController pageNo={Number(pageNo)} />
        </InputAccountInfoProvider>
      </div>
    </div>
  );
};

/*
 * 現在のページをコントロールする
 * pageNo = 1: Verify Age
 * pageNo = 2: Create Account
 * pageNo = 3: Verify Email
 */
const PageController = ({ pageNo }) => {
  console.log("PageController-pageNo: " + pageNo);
  console.log("pageNo === pageNo: " + pageNo === 1);
  console.log("typeof : " + typeof pageNo);
  /***** JSX ******/
  return (
    <>
      {pageNo === 1 ? (
        <VerifyAge Banner={Banner} />
      ) : pageNo === 2 ? (
        <CreateAccount Banner={Banner} />
      ) : pageNo === 3 ? (
        <VerifyEmail Banner={Banner} />
      ) : (
        <div>ページが見つかりません</div>
      )}
    </>
  );
};

/*
 * ページ右ポケモンイラストバナー
 */
const Banner = ({ icon }) => {
  /***** CSS ******/
  const characterBanner = (icon) => css`
    float: left;
    margin-right: -100%;
    width: 29.0225%;
    margin-left: 70.98%;
    background: ${icon === 1 ?
      "-webkit-linear-gradient(left top, #e6bc2f 50%, #ebc855 50%)"
      :
      "-webkit-linear-gradient(left top, #ee6b2f 50%, #f18553 50%)"
    };
    border-radius: 0 5px 5px 0;
    height: 100%;
    position: absolute;

    > img {
      position: absolute;
      border-radius: 5px 5px 0 0;
      width: 100%;
    }
  `;

  const customImg1 = css`
    margin: auto;
    max-width: 185px;
    display: block;
    float: none;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  `;

  const customImg2 = css`
    bottom: -20px;
    right: -20px;
    width: 100%;
    z-index: 3;
    float: left;
  `;

  return (
    <div css={[characterBanner(icon), hiddenMobile]}>
      {icon === 1 ? (
        <img
          src="../icons/pokemon-signup.png"
          alt="Create Your Account"
          css={customImg1}
        />
      ) : (
        <img
          src="../icons/picachu.png"
          alt="Create Your Account"
          css={customImg2}
        />
      )}
    </div>
  );
};

export default Signup;
