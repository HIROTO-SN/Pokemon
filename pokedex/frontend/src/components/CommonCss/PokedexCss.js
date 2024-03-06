/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/**
 * Pokedex, Pokemon Detail ページで使用する共通CSS
 */

/*** アニメーション ***/

// 0.5秒でフェードインし表示
export const animeFadeIn = css`
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

/**
 * レイアウトにアクセントの為の凹凸をつける
 * @param {String} urlPath - urlのpath指定 
 */
export const dogEarBl = (urlPath) => css`
	::before {
		content: " ";
		background: url(${urlPath}) no-repeat 0 0;
		height: 2em;
		position: absolute;
		width: 2em;
		z-index: 3;
		left: -1px;
		bottom: -1px;
		transform: rotate(-90deg);
	}
`;
