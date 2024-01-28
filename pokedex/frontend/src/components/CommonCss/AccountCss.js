/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// コンテント全体を囲う
export const contentBlockFull = css`
  clear: both;
  display: block;
  width: 100%;
`;
export const contentBlock = css`
  float: left;
  margin: 1em 0 0 0;
  position: relative;

  @media (min-width: 461px) and (max-width: 960px) {
    float: left;
    margin-right: -100%;
    width: 89.12%;
    margin-left: 5.4425%;
  }
`;

// 全体ラップ
export const formWrapper = css`
  float: left;
  margin-right: -100%;
  width: 70.98%;
  background-color: #f2f2f2;
  border-radius: 5px 0 0 5px;
  position: relative;
`;
export const dogEarTl = css`
  :before {
    content: " ";
    background: url("./background/default-dog-ear.png") no-repeat 0 0;
    height: 2em;
    position: absolute;
    width: 2em;
    z-index: 3;
    left: -1px;
    top: -1px;
    backface-visibility: hidden;

    @media (min-width: 461px) and (max-width: 960px) {
      background: none;
    }
  }

  @media (min-width: 461px) and (max-width: 960px) {
    border-radius: 5px;
    padding-bottom: 0;
    width: 96.875%;
    margin: 0 1.5625%;
  }
`;
// All FIELDS ARE REQUIRED 部分
export const fieldRequired = css`
  color: #616161;
  margin: 2em 0 0 2em;
  text-transform: none;
  font-family: "Roboto", arial, sans-serif;
  font-size: 100%;
  font-weight: 500;
  line-height: 125%;
`;

// form囲い
export const formInner = css`
  margin: 2em;

  & label {
    clear: both;
    color: #212121;
    float: left;
    font-size: 120%;
    line-height: 100%;
    margin: 0.875em 0 0.5em 0;
    width: 38.4375%;

    @media (min-width: 461px) and (max-width: 960px) {
      width: 96.875%;
      margin: 0 1.5625%;
    }
  }
`;

// 各inputタグを囲う
export const formField = css`
  float: right;
  margin-bottom: 1em;
  width: 58.4375%;

  @media (min-width: 461px) and (max-width: 960px) {
    margin-top: 0.25em;
    margin-bottom: 0.75em;
    width: 96.875%;
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
      padding: 1em 0.75em 0.425em 0.425em;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 2;

      :hover {
        background-color: #1d1d1d;
      }
    }
  }

  // リスト部（セレクトボックスでいうOption部）の幅など調整
  & li {
    clear: both;
    width: 93.75%;
    padding: 0.75em 3.125% 0.675em;
    cursor: pointer;

    :hover {
      background-color: #313131;
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
  color: #fff !important;
`;

// Submitボタン
export const submitButton = css`
  clear: both;
  margin: 1.5625%;
  margin-bottom: 1.5em;
  font-family: "Roboto", arial, sans-serif;
  float: right;
  appearance: none;
  border: none;
  text-align: center;
  cursor: pointer;
  background-color: #4dad5b;
  color: #fff;
  font-size: 105%;
  line-height: 125%;
  padding: 0.75em 1.25em 0.675em;
  vertical-align: middle;
  border-radius: 5px;
`;

// テキストボックスのレイアウトカスタマイズ
export const customFormElements = css`
  box-sizing: border-box!;
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
`;

// ボタンレイアウト
export const buttonRight = css`
  float: right;
`;

// ボタン薄い青色
export const buttonLightblue = css`
  background-color: #30a7d7;
  color: #fff;

  :hover {
    background-color: #1b82b1;
  }
`;

// カスタムチェックボックス
export const checkBox = css`
  cursor: pointer;
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: none;
  background-color: #313131;
  border-radius: 5px;
`;

// 前までの浮動要素の下に配置するための処理
export const clear = css`
  clear: both;
  before: {
    content: "";
    display: table;
  }
  after: {
    content: "";
    display: table;
  }
`;

// ラジオボタン、セレクトボックスなどを囲うpタグなどに用いる
export const inRowSelect = css`
  float: left;
  margin-left: 2em;
`;
