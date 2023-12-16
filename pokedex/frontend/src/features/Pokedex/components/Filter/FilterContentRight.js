/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CgPokemon } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { CgSearch } from "react-icons/cg";

const FilterContentRight = () => {
  /* ブロック全体CSS */
  const ContentBlock = styled.div`
    clear: both;
    display: block;
    width: 100%;
    float: left;
    margin: 1em 0 0 0;
    position: relative;
  `;

  const sectionTitle = css`
    margin: 0.5em 0;
    cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;
  `;

  const filterTitle = css`
    color: #fff;
    font-size: 167.5%;
    margin-left: 1.5625%;
    padding-left: 0;
    font-size: 187.5%;
  `;

  const customSelectWrapper = css`
    visibility: visible;
    width: 100%;
    float: left;
    position: relative;
    z-index: 2;
  `;

  const customSelectMenu = css`
    display: block;
    float: left;
    position: relative;
    width: 100%;
    z-index: 2;

    > label {
      box-sizing: border-box;
      background-color: #313131;
      border: none;
      border-radius: 5px;
      color: #fff;
      display: block;
      font-size: 100%;
      font-family: "Roboto", arial, sans-serif;
      line-height: 1.5;
      padding: 0.5em 0;
      text-indent: 0.5em;
      width: 100%;
      height: auto;
      margin: 0;
      overflow: hidden;
      cursor: pointer;
      white-space: nowrap;
    }
    > label > svg:first-of-type {
      font-family: "icons";
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      font-weight: normal;
      font-style: normal;
      text-decoration: inherit;
      text-transform: none;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      color: #f2f2f2;
      font-size: 150%;
      margin-right: 0.5em;
    }
    > label > svg:nth-of-type(2) {
      background-color: #313131;
      color: #fff;
      vertical-align: middle;
      font-family: "icons";
      display: inline-block;
      line-height: 1;
      font-weight: normal;
      font-style: normal;
      font-size: 100%;
      text-decoration: inherit;
      text-transform: none;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      border-radius: 5px;
      padding: 1em 0.75em 0.425em 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
      text-indent: 0.5em;
    }
  `;

  /* ブロック4つ目 */
  const filterAction = css`
    float: right;
    clear: both;
    margin-top: 2.75em;
    width: 100%;

    > a {
      clear: none;
      float: right;
      font-size: 125%;
			line-height: 100%;
    }

    > a svg {
      line-height: 100%;
      position: relative;
      top: -1px;
			vertical-align: middle;
			margin-right: 5px;
    }
  `;

  const button = css`
    border-radius: 5px;
    border: none;
    cursor: pointer;
    line-height: 125%;
    margin: 1.5625%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
    text-transform: none;
    font-family: "Flexo-Demi", arial, sans-serif;
  `;

  const buttonOrange = css`
    color: #fff;
    background-color: #ee6b2f;
		transition: 0.2s;

		:hover {
			background-color: #d05f2b;
		}
  `;

  const buttonGray = css`
    background-color: #a4a4a4;
    color: #fff;
		transition: 0.2s;
		
		:hover {
			background-color: #8c8585;
		}
  `;

  return (
    <>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Ability</h3>
        <div css={customSelectWrapper}>
          <select id="abilities" style={{ display: "none" }}></select>
          <div css={customSelectMenu}>
            <label>
              <CgPokemon />
              All
              <IoIosArrowDown viewBox="0 100 412 412" />
            </label>
            <div></div>
          </div>
        </div>
      </ContentBlock>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Height</h3>
      </ContentBlock>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Weight</h3>
      </ContentBlock>
      <ContentBlock>
        <div css={filterAction}>
          <a id="advSearch" css={[buttonOrange, button]}>
            <CgSearch stroke-width="1"/>
            Search
          </a>
          <a id="reset" css={[buttonGray, button]}>
            Reset
          </a>
        </div>
      </ContentBlock>
    </>
  );
};

export default FilterContentRight;
