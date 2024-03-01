/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { push1, column12 } from "../../../../components/CommonCss/Layout.js";
import { TfiReload } from "react-icons/tfi";
import CustomSelect from "../../../../components/Common/CustomSelect.js";
import { sortList } from "../../../../constants/ul_list/pokedexList.js";
import {
  useSearchCondition,
  useSearchDispatch,
} from "../../contexts/SearchContext.js";

/**
 * 「Surprise Me」 と 「Sort By」 の部分
 */
const Sort = () => {
  /***** CSS ******/
  const sort = css`
    overflow: visible;
    padding: 1em 0;
    background: transparent url("/background/content_bg.png") left top;
    background-size: 100% 1px;
    margin: 0 auto;
    max-width: 1024px;
    width: 100%;

    :before {
      content: "";
      display: table;
    }

    :after {
      clear: both;
      content: "";
      display: table;
    }
  `;

  const buttonSurprise = css`
    float: left;
    margin-right: -100%;
    width: 34.71%;
    margin-top: 2em;
    margin-left: 0.78125%;
    background-color: #30a7d7;
    color: #fff;
    border-radius: 5px;
    border: none;
    clear: both;
    cursor: pointer;
    font-size: 105%;
    line-height: 125%;
    padding: 0.75em 1.25em 0.675em;
    vertical-align: middle;
    text-align: center;
    text-transform: none;
    font-family: "Flexo-Demi", arial, sans-serif;

    > svg {
      line-height: 100%;
      position: relative;
      top: 2px;
      margin-right: 0.5em;
    }
  `;

  const flex = css`
    display: flex;
    float: right;
    margin-top: 2em;
    width: inherit;
    max-width: 45%;
  `;

  const sortLabel = css`
    white-space: nowrap;
    color: #a4a4a4;
    font-size: 125%;
    line-height: 125%;
    text-transform: none;
    margin: 0.5em 0.75em 0.5em 0;
    font-family: "Flexo-Medium", arial, sans-serif;
  `;

  /***** Definition ******/
  const searchCondition = useSearchCondition().sortBy;
  const searchDispatch = useSearchDispatch();

  // カスタムセレクトボックススタイル定義
  const customSelectStyle = {
    height: "180px",
    backgroundColor: "#616161",
    scrollbarColor: null,
    listWordColor: null,
  };

  /***** HTML ******/
  return (
    <section css={sort} style={{ overflow: "wrap" }}>
      <div css={[push1, column12]}>
        <a id="shuffle" css={buttonSurprise}>
          <TfiReload strokeWidth="1.7" />
          Surprise Me!
        </a>
        <div css={flex}>
          <h3 css={sortLabel}>Sort By</h3>
          <CustomSelect
            type="sortBy"
            state={searchCondition}
            dispatch={searchDispatch}
            list={sortList}
            custom={customSelectStyle}
            clickSubmit={true}
          />
        </div>
      </div>
    </section>
  );
};

export default Sort;
