/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column7, push7 } from "../../../../components/CommonCss/Layout";
import { IoFemale } from "react-icons/io5";
import { IoMale } from "react-icons/io5";
import {
  useAbilityInfoShow,
  useSetAbilityInfoShow,
} from "../../contexts/DetailContext";

export const MatchHeightTablet = ({ attribute }) => {
  /***** Definition ******/
  const cssObj = useMatchHeightTabletCss();

  const abilityInfoshow = useAbilityInfoShow();
  const setAbilityInfoShow = useSetAbilityInfoShow();

  /***** JS ******/
  /**
   * Abilityクリック時
   * @param {String} abilityName - 対象Abilityの名前
   */
  const abilityClickHandler = (abilityName) => {
    setAbilityInfoShow(abilityName);
  };

  /**
   * AbilityInfo内のCloseクリック時
   */
  const closeClickHandler = () => {
    setAbilityInfoShow(null);
  };

  /***** JSX ******/
  return (
    <div
      css={[cssObj.pokeAttributeBox, cssObj.lightBlue]}
    >
      <div css={column7}>
        <ul>
          {attribute.att_left.map((att) => (
            <li key={att.name}>
              <span css={cssObj.attribute_title}>{att.name}</span>
              {att.name === "Gender" ? (
                <span css={cssObj.attribute_value}>
                  <IoMale css={cssObj.symbol("male")} />
                  <IoFemale css={cssObj.symbol("female")} />
                </span>
              ) : (
                <span css={cssObj.attribute_value}>{att.val}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div css={[column7, push7]}>
        <ul>
          {attribute.att_right.map((att) => (
            <li key={att.name}>
              <span css={cssObj.attribute_title}>{att.name}</span>
              {att.name !== "Abilities" ? (
                <span css={cssObj.attribute_value}>{att.val}</span>
              ) : (
                <ul>
                  {att.val.map((ability) => (
                    <li key={ability.name + "_info-right"}>
                      <span
                        css={[cssObj.attribute_value, cssObj.moreInfo]}
                        onClick={() => abilityClickHandler(ability.name)}
                      >
                        {ability.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      {attribute.att_right.map(
        (att) =>
          att.name === "Abilities" &&
          att.val.map((ability) => (
            <div
              key={ability.name + "_detail"}
              css={cssObj.ability_detail(abilityInfoshow === ability.name)}
            >
              <span
                css={cssObj.button_close}
                onClick={() => closeClickHandler(ability)}
              >
                Close
              </span>
              <span css={cssObj.title}>Ability Info</span>
              <h3>{ability.name}</h3>
              <p>{ability.description}</p>
            </div>
          ))
      )}
    </div>
  );
};

/**
 * CSS定義
 */
const useMatchHeightTabletCss = () => {
  const pokeAttributeBox = css`
    min-height: 243px;
    border-radius: 10px;
    float: left;
    position: relative;
    width: 100%;
    animation: fadeIn 0.5s ease;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  const lightBlue = css`
    background-color: #30a7d7;
    color: #fff;
  `;

  const attribute_title = css`
    font-family: "Flexo-Medium", arial, sans-serif;
    clear: both;
    color: #fff;
    float: left;
    font-size: 100%;
    margin: 1.25em 0 0 1.25em;
    text-transform: none;
    white-space: normal;
    word-break: break-word;
  `;

  const attribute_value = css`
    font-family: "Flexo-Medium", arial, sans-serif;
    clear: both;
    color: #212121;
    float: left;
    font-size: 125%;
    margin: 0.75em 1.5em 0 1em;
    white-space: normal;
    word-break: break-word;
  `;

  // Abilityの横「？」マークスタイル
  const moreInfo = css`
    cursor: pointer;
    transition: 2.3s;
    ::after {
      font-family: "Flexo-Bold", arial, sans-serif;
      background: #fff;
      border-radius: 16px;
      color: #30a7d7;
      content: "?";
      font-size: 62.5%;
      height: 16px;
      line-height: 140%;
      margin: 0.25em 0 0 0.75em;
      position: absolute;
      text-align: center;
      width: 16px;
      cursor: pointer;
    }
  `;

  /**
   *
   * @param {String} gen - 性別判定
   */
  const symbol = (gen) => css`
    ${gen === "female" && "margin-left: 0.5em"};
    float: left;
    font-size: 125%;
    margin-bottom: 1em;
  `;

  /**
   *
   * @param {Boolean} disp - ability詳細を表示する判定
   */
  const ability_detail = (disp) => css`
    display: ${disp ? "block" : "none"};
    opacity: ${disp ? 1 : 0};
    position: absolute;
    top: 0;
    background-color: #313131;
    min-height: 243px;
    z-index: 3;
    height: 100%;
    border-radius: 10px;
    float: left;

    animation: fadeIn 0.5s ease;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    & h3 {
      clear: both;
      color: #fff;
      float: left;
      font-size: 150%;
      margin: 0.25em 1em;
    }

    & p {
      font-family: "Roboto", arial, sans-serif;
      font-weight: 500;
      clear: both;
      color: #f2f2f2;
      float: left;
      font-size: 100%;
      line-height: 125%;
      margin: 0 1.5em 2.5em;
    }
  `;

  const button_close = css`
    font-family: "Flexo-Bold", arial, sans-serif;
    background: #000 url("../background/dog-ear-bl-black.png") no-repeat left
      bottom;
    border-radius: 0 10px 0 0;
    cursor: pointer;
    font-size: 87.5%;
    padding: 1.25em 1.5em 0.75em 1.25em;
    position: absolute;
    right: 0;
    text-transform: none;
    top: 0;

    :before {
      content: "x";
      font-weight: bold;
      font-size: 120%;
      margin-right: 0.25em;
    }
  `;

  const title = css`
    font-family: "Flexo-Bold", arial, sans-serif;
    clear: both;
    color: #616161;
    float: left;
    font-size: 85%;
    margin: 1.25em 2em;
    text-transform: none;
  `;

  return {
    pokeAttributeBox,
    lightBlue,
    attribute_title,
    attribute_value,
    moreInfo,
    symbol,
    ability_detail,
    button_close,
    title,
  };
};
