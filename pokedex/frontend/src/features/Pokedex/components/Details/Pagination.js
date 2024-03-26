/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { hiddenMobile } from "../../../../components/CommonCss/Layout";

const Pagination = ({ pokeId, pokeName, pokePrevNextData }) => {
  /***** Definition ******/
  const c = useCssPagination();

  /***** JSX ******/
  return (
    <>
      <div css={c.pagination}>
        {pokePrevNextData.map((link, i) => (
          <Link
            key={link.pokemonName}
            to={`/pokedex/${link.pokemonName}`}
            state={link.pokemonId}
            css={[c.pagination_a, c.page(i)]}
            className={i}
            onClick="window.location.reload(true);"
          >
            <div>
              <span css={c.icon_arrow(i)}>
                {i === 0 ? (
                  <IoIosArrowBack />
                ) : (
                  <IoIosArrowForward />
                )}
              </span>
              <span css={c.pokeNumber(i)}>
                #{Number(link.pokemonId).toString().padStart(4, "0")}
              </span>
              <span css={[c.pokeName(i), hiddenMobile]}>
                {link.pokemonName}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div css={c.pagination_title}>
        <div>
          {pokeName}{" "}
          <span css={c.pokeNumber_title}>
            #{Number(pokeId).toString().padStart(4, "0")}
          </span>
        </div>
      </div>
    </>
  );
};

/**
 * CSS定義
 */
const useCssPagination = () => {
  // pagignation 全体
  const pagination = css`
    background-color: #fff;
    width: 100%;
  `;
  // pagignation a タグ
  const pagination_a = css`
    transition: background-color 0.3s;
    display: block;
    float: left;
    width: 50%;
    box-sizing: border-box;
    background-color: #a4a4a4;
    cursor: pointer;

    :hover {
      background-color: #30a7d7;
    }
  `;

  /**
   * 戻る、進む、独自スタイル
   * @param {String} flg - 戻る、進む判定用
   */
  const page = (flg) => css`
    // 戻る方のスタイル
    margin: 0;
    border-right: ${flg === 0 && "4px solid #fff"};
    > div {
      float: ${flg === 0 ? "right" : "left"};
      ${flg === 0 ? "margin-right: 0" : "margin-left: 0"};
      padding: 1em 0 4em;
      width: 100%;
      max-width: 448px;
    }
  `;

  // 戻る、進むのアイコンスタイル
  const icon_arrow = (flg) => css`
    background-color: #fff;
    border-radius: 20px;
    color: #616161;
    float: ${flg === 0 ? "left" : "right"};
    font-size: 65%;
    font-weight: bold;
    height: 26px;
    line-height: 275%;
    margin: 0.5em 1.5em 0;
    text-align: center;
    width: 26px;
    > svg {
      font-size: 170%;
      margin: 0.3em 0.2em 0 0;
    }
  `;

  const pokeNumber = (flg) => css`
    float: ${flg === 0 ? "left" : "right"};
    font-family: "Flexo-Bold", arial, sans-serif;
    color: #fff;
    font-size: 150%;
    line-height: 162.5%;
    text-transform: none;
  `;

  const pokeName = (flg) => css`
    float: ${flg === 0 ? "left" : "right"};
    color: #616161;
    margin: 0 0.5em;
    font-family: "Flexo-Bold", arial, sans-serif;
    font-size: 150%;
    line-height: 162.5%;
    text-transform: none;
    @media (min-width: 1281px) and (max-width: 9999px) {
      display: inherit !important;
    }
  `;

  const pagination_title = css`
    bottom: 0;
    float: left;
    margin-right: -100%;
    width: 58.0325%;
    margin-left: 20.2%;
    background-color: #fff;
    position: absolute;
    height: 51px;

    ::before {
      left: -75px;
      background: transparent url("../background/notch-white-xxl.png") no-repeat
        0 0;
      bottom: 0;
      content: " ";
      position: absolute;
      height: 52px;
      width: 75px;
    }
    ::after {
      right: -75px;
      background-position: right top;
      background-image: url("../background/notch-white-xxl.png");
      background-repeat: none;
      bottom: 0;
      content: " ";
      position: absolute;
      height: 52px;
      width: 75px;
    }
    > div {
      font-family: "Flexo-Medium", arial, sans-serif;
      color: #212121;
      float: left;
      font-size: 225%;
      margin-top: 0.5em;
      text-align: center;
      width: 100%;
      word-break: break-word;
    }
  `;

  const pokeNumber_title = css`
    color: #616161;
    margin-left: 0.125em;
    white-space: nowrap;
  `;

  return {
    pagination,
    pagination_a,
    page,
    icon_arrow,
    pokeNumber,
    pokeName,
    pagination_title,
    pokeNumber_title,
  };
};

export default Pagination;
