/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

/**
 * カスタムセレクトボックス
 * @param {Object} style - スタイルカスタマイズ用
 * @param {Object} state - リスト選択時の選択値管理state
 * @param {List} list - セレクト内リスト（※必ず 'name','id' プロパティを付けること）
 * @param {Function} action - リスト選択時のアクション
 */
const CustomSelectBase = ({ style, state, list, action }) => {
  /***** CSS *****/
  const useCss = useSelectCss();

  /***** Definition ******/
  const [isListOpened, setIsListOpened] = useState(false);

  /***** JS ******/
	/**
	 * リストアイテムクリック時
	 * @param {Number} id - 選択アイテムのid
	 */
  const listItemClickHandler = (id) => {
    arrowClickHandler();
		action(id);
  };

  // リストラベルクリック時
  const arrowClickHandler = () => {
    setIsListOpened(!isListOpened);
  };

  /***** JSX ******/
  return (
    <div css={useCss.wrapper(style.wrapper)}>
      <label onClick={() => arrowClickHandler()}>
				{list.find(li => li.id === state).name}
				{isListOpened ? (
          <IoIosArrowUp
            css={useCss.svg2Custom()}
            viewBox="0 150 412 412"
          ></IoIosArrowUp>
        ) : (
          <IoIosArrowDown
            css={useCss.svg2Custom()}
            viewBox="0 150 412 412"
          ></IoIosArrowDown>
        )}
      </label>
      <div css={[useCss.scrollbar(style.scroll, isListOpened)]}>
        <div css={style.scroll.scrollbarColor && useCss.viewport(style.scroll)}>
          <ul>
            {list.map((_list) => (
              <li
                key={_list.name}
                onClick={() => listItemClickHandler(_list.id)}
                css={useCss.customList(style.listStyle)}
              >
                {_list.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * カスタムCSS用Hooks
 */
const useSelectCss = () => {
  /**
   * セレクトボックス全体囲い
	 * @param {Object} s - スタイルオブジェクト
   */
  const wrapper = (s) => css`
    width: ${s.width};
		margin: ${s.margin};
		visibility: ${s.visibility};
    float: left;
    position: relative;
    z-index: 2;

    > label {
      background-color: #313131;
      border-radius: 5px;
      display: block;
      font-size: 100%;
      padding: 0.5em 0;
      text-indent: 0.5em;
      height: auto;
      overflow: hidden;
      cursor: pointer;
    }
  `;

  /**
   * svgイメージ1つ目
   */
  const svg1Custom = () => css`
    vertical-align: middle;
    font-size: 150%;
    margin-right: 0.5em;
  `;

  /**
   * svgイメージ2つ目
   */
  const svg2Custom = () => css`
    vertical-align: middle;
    padding: 1em 0.75em 0.425em 0.425em;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;

    :hover {
      background-color: #1d1d1d;
    }
  `;

  /**
   * カスタムセレクトボックス中スクロール部分囲い
	 * @param {Object} s - スタイルオブジェクト
	 * @param {Boolean} flg - リストオープンフラグ
   */
  const scrollbar = (s, flg) => css`
    display: ${flg ? "block" : "none"};
    ${s.height && "height: " + s.height};
    background-color: ${s.backgroundColor};
    clear: both;
    border-radius: 0 0 5px 5px;
    color: #fff;
    overflow: hidden;
    position: absolute;
    padding: 0;
    top: 2.5em;
    width: 100%;
    z-index: 50;
  `;

  /**
   * スクロール制御
	 * @param {Object} s - スタイルオブジェクト
   */
  const viewport = (s) => css`
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
      background: ${s.scrollbarColor === "dark"
        ? "url('../background/scrollbar_bg_dark.png') 2px 0 no-repeat"
        : "url('../background/scrollbar_bg.png') 2px 0 no-repeat"};
      width: 19px;
      height: 14px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${s.scrollbarColor === "dark" ? "#313131" : "#fff"};
      border-radius: 6px;
      width: 10px;
      border: 4px solid transparent;
      background-clip: padding-box;
    }

    ::-webkit-scrollbar-track {
      margin: 5px;
    }
  `;

  /**
   * リスト部
	 * @param {Object} s - スタイルオブジェクト
   */
  const customList = (s) => css`
    clear: both;
    width: 93.75%;
    padding: 0.75em 3.125% 0.675em;
    cursor: pointer;
    :hover {
      color: ${s.color != void 0 && s.color };
      background-color: #313131;
    }
		${s.margin != void 0 && "margin: " + s.margin};
		${s.textAlign != void 0 && "text-align: " + s.textAlign};
  `;
  return {
    wrapper,
    svg1Custom,
    svg2Custom,
    scrollbar,
    viewport,
    customList,
  };
};

export default CustomSelectBase;
