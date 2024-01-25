/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { stepMenuList } from "../../../constants/UlList";
import { useCurrentPage } from "../../../contexts/SignupContext";

const StepsMenu = () => {
  /***** CSS ******/
  // メニュー全体
  const stepMenu = css`
    margin: 1em 0;
    overflow: hidden;
    width: 100%;
    list-style: none;

    // それぞれのリストスタイル共通
    > li {
      float: left;
      margin-right: -100%;
      width: 31.81%;
      background-color: #30a7d7;
      display: block;
      min-height: 48px;
      position: relative;
    }

    // それぞれのリスト内形成共通
    > li > span {
      cursor: default;
      color: #fff;
      float: left;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      line-height: 48px;
      margin: 0 4.6875%;
      text-align: center;
      width: 93.75%;
    }
  `;

  // リストの前部分の成型
  const liBefore = css`
    :before {
      content: " ";
      position: absolute;
      top: 0;
      left: -2px;
      height: 0;
      width: 0;
      border-color: transparent transparent transparent #fff;
      border-style: solid;
      border-width: 24px;
    }
  `;

  // リストの後ろ部分の成型
  const liAfter = (isCurrentPage) => css`
    :after {
      content: " ";
      position: absolute;
      top: 0;
      right: -48px;
      height: 0;
      width: 0;
      border-color: transparent transparent transparent ${isCurrentPage ? "#30a7d7" : "#616161"};
      border-style: solid;
      border-width: 24px;
    }
  `;

  // 各リストスタイルを個別に定義するスタイルを呼び出す
  const listClass = ({ list }, currentPage) => {
    switch (list.class) {
      case "first":
        return first(list.pageNo === currentPage.pageNo);
      case "middle":
        return middle(list.pageNo === currentPage.pageNo);
      case "last":
        return last(list.pageNo === currentPage.pageNo);
    }
  };

  // リスト1つ目
  const first = (isCurrentPage) => css`
    border-radius: 5px 0 0 5px;
    margin-left: 0;
    z-index: 4;
    ${liAfter(isCurrentPage)}
    ${!isCurrentPage && "background-color: #616161!important"};
  `;

  // リスト2つ目
  const middle = (isCurrentPage) => css`
    margin-left: 33.8525%;
    z-index: 2;
    ${liBefore}
    ${liAfter(isCurrentPage)}
    ${!isCurrentPage && "background-color: #616161!important"};
  `;

  // リスト3つ目
  const last = (isCurrentPage) => css`
    border-radius: 0 5px 5px 0;
    margin-left: 67.7125%;
    margin-right: 0;
    z-index: 1;
    ${liBefore}
    ${liAfter(isCurrentPage)}
    ${!isCurrentPage && "background-color: #616161!important"};

    :after {
      right: -26px;
      border-color: #fff #fff #fff #616161;
    }
  `;

  /***** JS ******/

  /***** Context ******/
  const currentPage = useCurrentPage();
  
  /***** State ******/

  /***** HTML ******/
  return (
      <div>
        <ul css={stepMenu}>
          {stepMenuList.map((list) => (
            <li key={list.class} css={listClass({ list }, currentPage)}>
              <span>{list.name}</span>
            </li>
          ))}
        </ul>
      </div>
  );
};

export default StepsMenu;
