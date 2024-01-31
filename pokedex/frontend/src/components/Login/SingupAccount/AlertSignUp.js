/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const AlertSignUp = ({ error }) => {
  /***** CSS ******/
  const inlineFormError = css`
    background-color: #616161;
    border-radius: 5px;
    color: #fff;
    float: left;
    margin-top: 1em;
    padding-left: 10%;
    position: relative;
    width: 90%;
    :before {
      content: "!";
      color: #fff;
      border-radius: 10px;
      border: 1px solid #484848;
      background-color: #e3350d;
      float: left;
      font-size: 14px;
      height: 20px;
      left: 0;
      line-height: 20px;
      margin: -10px 0.5em 0 0.85em;
      position: absolute;
      top: 50%;
      text-align: center;
      width: 20px;
    }
    :after {
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid #616161;
      content: "";
      height: 0;
      left: 16px;
      margin: 0;
      position: absolute;
      top: -8px;
      width: 0;
      z-index: 2;
    }

		> span {
			float: left; 
			font-size: 87.5%;
			line-height: 150%;
			margin: 0.75em 1.5em;
		}
  `;

	const errorList = css`
		> li {
			white-space: pre-line;
		}
	`

  return (
		<div css={inlineFormError}>
			<span>
				<ul css={errorList}>
					<li>{error}</li>
				</ul>
			</span>
		</div>
	)
};

export default AlertSignUp;
