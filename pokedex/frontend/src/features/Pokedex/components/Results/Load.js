/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

const Load = () => {
  const moveLoad = keyframes`
		0% {
			transform: rotate(0);
			animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
		}
		50% {
			transform: rotate(900deg);
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		}
		100% {
			transform: rotate(1800deg);
		}
	`;

  const ldsHourglass = css`
    position: relative;
    width: 80px;
    height: 80px;
		display: block;
		margin: 0 auto;

		:after {
      content: " ";
      display: block;
      border-radius: 50%;
      width: 0;
      height: 0;
			margin: 0 auto;
      box-sizing: border-box;
      border: 15px solid #616161;
      border-color: #616161 transparent #616161 transparent;
      animation: ${moveLoad} 1.2s infinite;
    }
  `;
  return <span css={ldsHourglass}></span>;
};

export default Load;
