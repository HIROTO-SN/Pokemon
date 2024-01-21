/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// 各inputタグを囲う
export const formField = css`
  float: right;
  margin-bottom: 1em;
  width: 58.4375%;

  > input[type="text"] {
    background: #888;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 100%;
    font-family: "Roboto", arial, sans-serif;
    line-height: 1.5;
    padding: 0.5em 0;
    text-indent: 0.5em;
    width: 100%;
    height: auto;
  }
`;

// カスタムのセレクトボックス(隠し項目)
export const customSelectWrapper = css`
  position: relative;
  float: left;
  width: 100%;
  z-index: 2;

  & select {
    box-sizing: border-box;
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
  }

  & label {
    clear: both;
    float: left;
    display: block;
    width: 100%;
    height: auto;
    padding: 0.5em 0;
    line-height: 1.5;
    font-size: 100%;
    font-family: "Roboto", arial, sans-serif;
    text-indent: 0.5em;
    color: #fff;
    background-color: #313131;
    box-sizing: border-box;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0;
    overflow: hidden;

    > svg {
      border-radius: 5px;
      padding: 1em 0.75em 0.425em 0;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;
    }
  }
`;

// カスタムセレクトボックス大元囲い(基本divタグで使用)
export const customSelectMenu = css`
  display: block;
  float: left;
  position: relative;
  width: 100%;
  z-index: 2;
`;

// カスタムセレクトボックス中スクロール部分囲い
export const customScrollbar = css`
  clear: both;
  border-radius: 0 0 5px 5px;
  background-color: #616161;
  color: #fff;
  overflow: hidden;
  position: absolute;
  padding: 0;
  top: 2.5em;
  width: 100%;
  z-index: 50;
`;

export const buttonBlack = css`
  color: #fff;
`;
