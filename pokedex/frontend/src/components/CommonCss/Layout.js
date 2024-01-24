/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const push1 = css`
  margin-left: 7.2525%;
  @media (min-width: 461px) and (max-width: 960px) {
    margin: 0;
    margin-left: 7.2525%;
  }
`;
export const push2 = css`
  margin-left: 14.5125%;
`;
export const push7 = css`
  margin-left: 50.7825%;
  @media (min-width: 461px) and (max-width: 960px) {
    margin: 0;
    margin-left: 7.2525%;
  }
`;
export const push8 = css({
  marginLeft: "58.0325%",
});

export const column5 = css({
  float: "left",
  marginRight: "-100%",
  width: "34.71%",
});
export const column6 = css`
  float: left;
  margin-right: -100%;
  width: 41.96%;

  @media (min-width: 461px) and (max-width: 960px) {
    width: 85.49%;
  }
`;
export const column7 = css`
  float: left;
  margin-right: -100%;
  width: 49.22%;
`;
export const column10 = css`
  float: left;
  margin-right: -100%;
  width: 70.98%;
`;
export const column12 = css({
  float: "left",
  marginRight: "-100%",
  width: "85.49%",
});

export const colorBlack = css`
  color: #313131;
`;

export const ttHint = css({
  display: "none",
});

export const container = css`
  box-sizing: border-box;
  background: #fff url("./background/container_bg.png");
  clear: both;
  display: block;
  margin: 0 auto;
  max-width: 1280px;
  overflow: hidden;
  position: relative;
`;

export const section = css`
  padding: 1em 0;
  background: transparent url("./background/content_bg.png") left top;
  background-size: 100% 1px;
  display: block;
  margin: 0 auto;
  overflow: hidden;
  max-width: 1024px;
  width: 100%;

  :first-of-type {
    padding-top: 25px;
  }
`;

export const visibleMobile = css`
  text-transform: none;
  @media (min-width: 461px) and (max-width: 960px) {
    display: inherit !important;
  }
  @media (min-width: 961px) and (max-width: 9999px) {
    display: none;
  }
`;
export const hiddenMobile = css`
  @media (min-width: 461px) and (max-width: 960px) {
    display: none;
  }
  @media (min-width: 961px) and (max-width: 9999px) {
    display: inherit !important;
  }
`;
// カスタムセレクトボックス スクロール制御
export const viewport = css`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 10px;
  right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 22px;
    height: 22px;
  }

  ::-webkit-scrollbar-button {
    background: url("./background/scrollbar_bg.png") 2px 0 no-repeat;
    width: 19px;
    height: 14px;
  }

  ::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 6px;
    width: 10px;
    border: 4px solid transparent;
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-track {
    margin: 5px;
  }
`;

// カスタムモーダル（誕生日部などで使用）
export const picker = css`
  position: fixed;
  font-size: 100%;
  text-align: left;
  line-height: 1.2;
  color: #313131;
  position: absolute;
  z-index: 10000;
`;
export const pickerOpened = css`
  top: 0;
  zoom: 1;
  background: rgba(0, 0, 0, 0.8);
  transition: 0.3s ease-out;
`;
export const pickerHolder = css`
  position: fixed;
  transition: 0.3s ease-out, top 0s 0.3s;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  overflow-y: auto;
`;
export const pickerFrame = css`
  position: absolute;
  top: 0;
  margin: 0 auto;
  min-width: 256px;
  max-width: 666px;
  width: 100%;
  filter: alpha(opacity=0);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.2);
`;
export const pickerWrap = css`
  display: table;
  width: 100%;
  height: auto;
`;
export const pickerBox = css`
  background: #fff;
  display: table-cell;
  vertical-align: middle;
  padding: 0 1em;
`;
export const pickerHeader = css`
  text-align: center;
  position: relative;
  margin-top: 0.75em;
  min-height: 3em;
`;
export const pickerTable = css`
  clear: both;
  text-align: center;
  border-collapse: collapse;
  border-spacing: 0;
  table-layout: fixed;
  font-size: inherit;
  width: 100%;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
`;
export const pickerFooter = css`
  text-align: center;
`;
export const pickerNavPrev = css`
  left: -1em;
  padding-right: 1.5em;
  position: absolute;
  top: 0.2em;
  padding: 0.5em 1.33em;
  width: 1em;
  height: 1em;
  :before {
    content: " ";
    border-top: 0.5em solid transparent;
    border-bottom: 0.5em solid transparent;
    border-right: 0.75em solid #313131;
    width: 0;
    height: 0;
    display: block;
    margin: 0 auto;
  }
`;
export const pickerNavNext = css`
  right: -1em;
  padding-left: 1.5em;
  position: absolute;
  top: 0.2em;
  padding: 0.5em 1.33em;
  width: 1em;
  height: 1em;
  :before {
    border-right: 0;
    border-left: 0.75em solid #313131;
    content: " ";
    border-top: 0.5em solid transparent;
    border-bottom: 0.5em solid transparent;
    width: 0;
    height: 0;
    display: block;
    margin: 0 auto;
  }
`;
