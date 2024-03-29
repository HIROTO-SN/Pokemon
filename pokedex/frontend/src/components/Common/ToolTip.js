/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

/**
 * ツールチップベース
 */
const ToolTip = ({ text, children }) => {
  /***** CSS *****/
  const tooltipContainer = css`
    position: absolute;
    bottom: 105%;
    left: 105%;
    width: 100%;
  `;

  const tooltip = css`
    visibility: visible;
    background-color: #616161;
    color: #fff;
    border-radius: 10px;
    width: 160px;
    padding: 22px 0px;
    position: absolute;
    bottom: 8px;
    left: 40%;
    transform: translateX(-50%);
    z-index: 10;
    opacity: 1;
    transition: opacity 1.0s ease;

		@media (min-width: 961px) and (max-width: 9999px) {
			:after {
				bottom: -10px;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-top: 10px solid #616161;
				content: "";
				height: 0;
				left: 50%;
				margin-left: -10px;
				position: absolute;
				width: 0;
				z-index: 5;
			}
		}
  `;

  /***** DEFINITION ******/
  const [showTooltip, setShowTooltip] = useState(false);

  /***** EVENT ******/
  const handleMouseOver = () => {
    setShowTooltip(true);
  };

  const handleMouseOut = () => {
    setShowTooltip(false);
  };
  /***** JSX *****/
  return (
    <div
      css={tooltipContainer}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
			{children}
      {showTooltip && (
        <div css={tooltip}>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
};

export default ToolTip;
