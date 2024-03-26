import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import FilterHeader from "./FilterHeader";
import FilterContent from "./FilterContent";
import FilterMobile from "./FilterMobile";

const Filter = () => {
  const [toggleActive, setToggleActive] = useState(false);

  const filter = css`
    clear: both;
    background: #616161;
    border-color: #212121;
    border-style: solid;
    border-width: 1px 0 0 0;
    width: 100%;
    padding-bottom: 1em;
  `;
  
  const filterToggle = css`
    overflow: visible;
    padding: 0;
    background: transparent url("/background/content_bg.png") left top;
    background-size: 100% 1px;
    display: block;
    margin: 0 auto;
    max-width: 1024px;
    width: 100%;
  `;
  
  const filterToggleSpan = css`
    float: left;
    margin-right: -100%;
    width: 41.96%;
    margin-left: 29.0225%;
    background-color: #616161;
    height: 16px;
    cursor: pointer;
    position: relative;
  
    :before {
      background: transparent url("/background/large-notch-darkgray.png")
        no-repeat;
      background-size: 38px 18px;
      content: " ";
      height: 18px;
      left: -36px;
      position: absolute;
      width: 38px;
      top: -2px;
      transform: scaleY(-1);
    }
    :after {
      left: auto;
      right: -36px;
      background: transparent url("/background/large-notch-darkgray.png")
        no-repeat;
      background-size: 38px 18px;
      content: " ";
      height: 18px;
      position: absolute;
      width: 38px;
      top: -2px;
      transform: rotate(180deg);
    }
    > span {
      font-family: "Flexo-Medium", arial, sans-serif;
      background-color: #616161;
      display: block;
      float: left;
      font-size: 100%;
      line-height: 150%;
      margin: 0;
      padding: 0;
      position: absolute;
      top: -1em;
      text-transform: none;
      text-align: center;
      width: 100%;
      z-index: 1;
      cursor: pointer;
    }
  `;
  
  const text = css`
    text-decoration: none;
    text-align: center;
  `;
  
  const arrow = css`
    display: inline-block;
    background-color: #fff;
    border-radius: 10px;
    margin-left: 0.5em;
    height: 20px;
    width: 20px;
    font-family: "icons";
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-weight: normal;
    font-style: normal;
    text-decoration: inherit;
    text-transform: none;
    text-rendering: auto;
  
    :before {
      display: inline-block;
      ${toggleActive ? "margin-top: 30%": "margin-bottom: 2px"};
      color: #616161;
      line-height: 1;
      width: 0.7em;
      height: 0.7em;
      border: 0.18em solid currentColor;
      border-left: 0;
      border-bottom: 0;
      box-sizing: border-box;
      transform: ${!toggleActive ? "translateY(-25%) rotate(135deg)" : "translateY(-25%) rotate(-45deg)"};
      content: " ";
      font-size: 85%;
      line-height: 135%;
      /* transition: transform 0.1s; */
    }
  `;

  /***** JS ******/
  
  /***** JSX ******/
  return (
    <>
      <section css={filter}>
        <FilterHeader/>
        <FilterMobile toggleActive={toggleActive}/>
        <FilterContent toggleActive={toggleActive}/>
      </section>
      <section css={filterToggle}>
        <div css={filterToggleSpan}>
          <span onClick={() => setToggleActive(!toggleActive)}>
            <b css={text}>
            {toggleActive ?
							"Hide Advanced Search" :
							"Show Advanced Search"
						}
            </b>
            <i css={arrow}></i>
          </span>
        </div>
      </section>
    </>
  );
};


export default Filter;
