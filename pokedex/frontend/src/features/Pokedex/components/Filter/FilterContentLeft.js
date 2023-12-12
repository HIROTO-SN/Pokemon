import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const FilterContentLeft = () => {
  const ContentBlock = styled.div`
    clear: both;
    display: block;
    width: 100%;
    float: left;
    margin: 1em 0 0 0;
    position: relative;
  `;

  const wrapperH2 = css`
    padding: 0;
    float: left;
    margin-right: -100%;
    width: 49.22%;
    color: #fff;
    font-size: 167.5%;
  `;

  const sectionTitle = css`
    margin: 0.5em 0;
    cursor: default;
    line-height: 125%;
    text-transform: none;
    font-family: "Flexo-Regular", arial, sans-serif;
  `;

  const filterHelp = css`
    margin-right: -100%;
    margin-left: 50.7825%;
    width: 49.22%;
    float: left;

    > span {
      font-family: "Flexo-Medium", arial, sans-serif;
      color: #fff;
      font-size: 90%;
      float: left;
      margin-top: 1.75em;
      margin-right: 3.125%;
      text-transform: none;
    }
  `;

  return (
    <>
      <ContentBlock>
        <h2 css={[sectionTitle, wrapperH2]}>Type & Weakness</h2>
        <div css={filterHelp}>
          <span>
            <strong>T</strong> = Type
          </span>
          <span>
            <strong>W</strong> = Weakness
          </span>
        </div>
      </ContentBlock>
      <ContentBlock>b</ContentBlock>
      <ContentBlock>c</ContentBlock>
    </>
  );
};

export default FilterContentLeft;
