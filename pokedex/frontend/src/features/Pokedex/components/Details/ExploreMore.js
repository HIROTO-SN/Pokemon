/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column12, push1 } from "../../../../components/CommonCss/Layout";
import {
  button,
  buttonOrange,
  contentBlock,
  contentBlockHalf,
  contentBlockHalfFirst,
} from "../../../../components/CommonCss/PokedexCss";
import { Link } from "react-router-dom";
import { buttonRight } from "../../../../components/CommonCss/AccountCss";

const ExploreMore = () => {
  /***** Definition ******/
  const c = useCssExploreMore();

  return (
    <div css={[column12, push1]}>
      <div css={[contentBlock, contentBlockHalfFirst]}></div>
      <div css={[contentBlock, contentBlockHalf]}>
        <Link
          to="/pokedex"
          css={[buttonRight, buttonOrange, button]}
          style={{ marginRight: 0 }}
        >
          Explore More Pokémon
        </Link>
      </div>
    </div>
  );
};

/**
 * CSS定義
 */
const useCssExploreMore = () => {};

export default ExploreMore;
