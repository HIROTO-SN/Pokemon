/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const FilterContentLeft = () => {
  /* ブロック全体CSS */
  const ContentBlock = styled.div`
    clear: both;
    display: block;
    width: 100%;
    float: left;
    margin: 1em 0 0 0;
    position: relative;
  `;

  /* ブロック1: タイトル */
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

  /* ブロック2: タイプList */
  const twList = css`
    float: left;
    height: 370px;
    width: 100%;
    list-style: none;

    > li {
      float: left;
      height: 28px;
      margin-bottom: 12px;
      width: 50%;
    }
  `;

  const pill = ({type}) => css`
    border: 2px solid #a4a4a4;
    border-radius: 5px;
    line-height: 28px;
    max-width: 110px;
    width: 50%;
    font-family: "Flexo-Medium", arial, sans-serif;
    cursor: pointer;
    float: left;
    height: 28px;
    margin: 0 0.75em 0 0;
    text-align: center;
    background: ${type.background};
    color: ${type.color ? type.color : "inherit"};
  `;

  const filterTypeRound = css`
    font-family: "Flexo-Bold", arial, sans-serif;
    background: #f2f2f2;
    border-radius: 14px;
    color: #313131;
    line-height: 30px;
    width: 28px;
    cursor: pointer;
    float: left;
    height: 28px;
    margin: 0 0.75em 0 0;
    text-align: center;
  `;

  const filterWeaknessRound = css`
    margin-right: 0;
    font-family: "Flexo-Bold", arial, sans-serif;
    background: #f2f2f2;
    border-radius: 14px;
    color: #313131;
    line-height: 30px;
    width: 28px;
    float: left;
    height: 28px;
    margin: 0 0.75em 0 0;
    text-align: center;
  `;

  /* ブロック3: NumberRange */
  const rangeFilterWrapper = css`
    clear: both;
    display: block;
    margin: 0 0 1.5em;
    width: 93.75%;

    > h3 {
      color: #fff;
      font-size: 167.5%;
      float: left;
      margin-right: -100%;
      margin-top: 0.5em;
      margin-bottom: 1em;
      text-transform: none;
      width: 100%;
      line-height: 125%;
    }
    @media (min-width: 461px) and (max-width: 960px) {
      margin-bottom: 2em;
    }
  `;

  const rangeBox = css`
    @media screen and (min-width: 961px) {
      margin-top: 10px;
      float: right;
    }
    margin-bottom: 5px;

    > span {
      padding: 0 10px;
    }
  `;

  const inputArea = css`
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    font-size: 100%;
    font-family: "Roboto", arial, sans-serif;
    line-height: 1.5;
    padding: 0.5em 0;
    text-indent: 0.5em;
    height: auto;
    background-color: #fff;
  `;
  const commonRangeBox = css`
    color: black;
    width: 75px;
    display: inline;
  `;

  const rangeValues = css`
    display: none;
    float: left;
    margin-right: -100%;
    width: 34.71%;
    margin-left: 65.2925%;
    font-family: "Flexo-Medium", arial, sans-serif;
    color: #fff;
    font-size: 175%;
    margin-top: 0.325em;
    margin-bottom: 1em;
    text-align: right;
    font-weight: 500;
    line-height: 125%;
  `;

  const typeList = [
    { name: "Bug", background: "#729f3f" },
    { name: "Dark", background: "#707070" },
    { name: "Dragon", background: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)"},
    { name: "Electric", background: "#eed535", color: "#212121"},
    { name: "Fairy", background: "#fdb9e9", color: "#212121" },
    { name: "Fighting", background: "#d56723" },
    { name: "Fire", background: "#fd7d24" },
    { name: "Flying", background: "linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)", color: "#212121" },
    { name: "Ghost", background: "#7b62a3" },
    { name: "Grass", background: "#9bcc50", color: "#212121" },
    { name: "Ground", background: "linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)", color: "#212121" },
    { name: "Ice", background: "#51c4e7", color: "#212121" },
    { name: "Normal", background: "#a4acaf", color: "#212121" },
    { name: "Poison", background: "#b97fc9" },
    { name: "Psychic", background: "#f366b9" },
    { name: "Rock", background: "#a38c21" },
    { name: "Steel", background: "#9eb7b8", color: "#212121" },
    { name: "Water", background: "#4592c4" },
  ];

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
      <ContentBlock>
        <ul css={twList}>
          {typeList.map((type) => (
            <li>
              <span css={pill({type})}>{type.name}</span>
              <span css={filterTypeRound}>T</span>
              <span css={filterWeaknessRound}>W</span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <div css={rangeFilterWrapper}>
          <h3>Number Range</h3>
          <div css={rangeBox}>
            <input css={[commonRangeBox, inputArea]} value="1"></input>
            <span>-</span>
            <input css={[commonRangeBox, inputArea]} value="1010"></input>
          </div>
        </div>
        <p css={rangeValues}>
          <span id="min"></span>-<span id="max"></span>
        </p>
      </ContentBlock>
    </>
  );
};

export default FilterContentLeft;
