/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { stepMenuList } from "../../../constants/UlList";

const StepsMenu = () => {
  /***** CSS ******/
  const stepMenu = css`
    margin: 1em 0;
    overflow: hidden;
    width: 100%;
    list-style: none;

    > li {
      float: left;
      margin-right: -100%;
      width: 31.81%;
      background-color: #30a7d7;
      display: block;
      min-height: 48px;
      position: relative;

      :before {
        border-color: transparent transparent transparent #fff;
        left: -2px;
        border-style: solid;
        border-width: 24px;
        content: " ";
        height: 0;
        position: absolute;
        top: 0;
        width: 0;
      }

      :after {
        border-color: transparent transparent transparent #30a7d7;
        right: -48px;
        border-style: solid;
        border-width: 24px;
        content: " ";
        height: 0;
        position: absolute;
        top: 0;
        width: 0;
      }
    }

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

  const listClass = ({ list }) => {
    switch (list.class) {
      case "first":
        return first;
      case "middle":
        return [middle, inactive];
      case "last":
        return [last, inactive];
    }
  };

  const first = css`
    border-radius: 5px 0 0 5px;
    margin-left: 0;
    z-index: 4;
  `;

  const middle = css`
    margin-left: 33.8525%;
    z-index: 2;
  `;

  const last = css`
    border-radius: 0 5px 5px 0;
    margin-left: 67.7125%;
    margin-right: 0;
    z-index: 1;
  `;

  const inactive = css`
    background-color: #616161 !important;
		:after {
			background-color: #616161 !important;
			right: -48px;
		}
  `;

  return (
    <div>
      <ul css={stepMenu}>
        {stepMenuList.map((list) => (
          <li key={list.class} css={listClass({ list })}>
            <span>{list.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepsMenu;
