/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CgPokemon } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { CgSearch } from "react-icons/cg";
import { useEffect, useState } from "react";

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

  /* ブロック1つ目 */
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

  /* ブロック2つ目 */
  const filterWHeight = css`
    height: 80px;
    margin-bottom: 0.5em;
    width: 100%;
    list-style: none;

    > li {
      float: left;
      width: 27.46%;
      background-color: #f2f2f2;
      border-radius: 12px;
      color: #313131;
      cursor: pointer;
      height: 100%;
      margin: 0 1.5625%;
      overflow: hidden;
    }
    > li > span {
      color: #313131;
      font-size: 300%;
      line-height: 80px;
      text-align: center;
      width: 100%;
      vertical-align: middle;
    }
  `;
  const size = ({ list }) => css`
    margin-left: ${list.name == "middle" && "5.62%"};
    margin-right: ${list.name == "middle" && "5.62%"};
  `;
  const imgHWeight = ({ list }) => css`
    cursor: pointer;
    position: relative;
    top: ${list.top};
    left: 50%;
    transform: translate(-50%, -50%);
  `;
  const offscreen = css`
    left: -99999px;
    position: absolute;
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

  const heightList = [
    {
      name: "short",
      height: "45%",
      top: "35%",
      urlB: "/icons/heightShort.png",
    },
    {
      name: "middle",
      height: "52%",
      top: "35%",
      urlB: "/icons/heightMiddle.png",
    },
    { name: "tall", height: "90%", top: "45%", urlB: "/icons/heightTall.png" },
  ];

  const weightList = [
    { name: "light", height: "45%", top: "35%", urlB: "/icons/ball.png" },
    { name: "middle", height: "50%", top: "38%", urlB: "/icons/ball.png" },
    { name: "heavy", height: "60%", top: "45%", urlB: "/icons/ball.png" },
  ];

  const clickedColor = "#ee6b2f";

  /***** Definition ******/
  const [clickedHeightList, setClickedHeightList] = useState([]);
  const [clickedWeightList, setClickedWeightList] = useState([]);

  /***** JS ******/
  const clickHWHandler = (name, type) => {
    switch (type) {
      case "H":
        if (clickedHeightList.find((n) => n === name)) {
          const filteredHeightList = clickedHeightList.filter(
            (heightName) => heightName !== name
          );
          setClickedHeightList(filteredHeightList);
        } else {
          setClickedHeightList([...clickedHeightList, name]);
        }
        break;
      case "W":
        if (clickedWeightList.find((n) => n === name)) {
          const filteredWeightList = clickedWeightList.filter(
            (weightName) => weightName !== name
          );
          setClickedWeightList(filteredWeightList);
        } else {
          setClickedWeightList([...clickedWeightList, name]);
        }
        break;
    }
  };

  useEffect(() => {
    clickedHeightList.map((heightList) => {
      const el_target = document.querySelector("#" + heightList + "_h");
      el_target.style.background = clickedColor;

      // const el_target_img = document.querySelector("#" + heightList + "_imgH");
    });
    clickedWeightList.map((weightList) => {
      const el_target = document.querySelector("#" + weightList + "_w");
      el_target.style.background = clickedColor;
    });
  }, [clickedWeightList, clickedHeightList]);

  /***** HTML ******/
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
        <ul css={filterWHeight}>
          {heightList.map((list) => (
            <li
              id={list.name + "_h"}
              css={size({ list })}
              key={list.name}
              onClick={() => clickHWHandler(list.name, "H")}
            >
              <span>
                <img
                  id={list.name + "_imgH"}
                  css={imgHWeight({ list })}
                  src={list.urlB}
                  height={list.height}
                />
              </span>
              <span css={offscreen}></span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <h3 css={[sectionTitle, filterTitle]}>Weight</h3>
        <ul css={filterWHeight}>
          {weightList.map((list) => (
            <li
              id={list.name + "_w"}
              css={size({ list })}
              key={list.name}
              onClick={() => clickHWHandler(list.name, "W")}
            >
              <span>
                <img
                  css={imgHWeight({ list })}
                  src={list.urlB}
                  height={list.height}
                />
              </span>
              <span css={offscreen}></span>
            </li>
          ))}
        </ul>
      </ContentBlock>
      <ContentBlock>
        <div css={filterAction}>
          <a id="advSearch" css={[buttonOrange, button]}>
            <CgSearch strokeWidth="1" />
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
