/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const VerifyAge = () => {
  /***** CSS ******/
  // 全体ラップ
  const formWrapper = css`
    float: left;
    margin-right: -100%;
    width: 70.98%;
    background-color: #f2f2f2;
    border-radius: 5px 0 0 5px;
    position: relative;
  `;
  const dogEarTl = css`
    :before {
      content: " ";
      background: url("./background/default-dog-ear.png") no-repeat 0 0;
      height: 2em;
      position: absolute;
      width: 2em;
      z-index: 3;
      left: -1px;
      top: -1px;
      backface-visibility: hidden;
    }
  `;
	// All FIELDS ARE REQUIRED 部分
	const fieldRequired = css`
		color: #616161;
    margin: 2em 0 0 2em;
    text-transform: none;
		font-family: "Roboto",arial,sans-serif;
    font-size: 100%;
    font-weight: 500;
    line-height: 125%;
	`;

	// form囲い
	const formInner = css`
		margin: 2em;
	`;

	// form下注釈囲い
	const logInRow = css`
		min-height: 250px;
		border-radius: 0 0 0 5px;
    background-color: #616161;
    display: block;
    float: left;
    padding: 2.12em 0;
    width: 100%;
	`;

  return (
		<div css={[formWrapper, dogEarTl]}>
			<p css={fieldRequired}>ALL FIELDS ARE REQUIRED.</p>
			<form id="verify-age" css={formInner}>

			</form>
			<div css={logInRow}>

			</div>
		</div>
	);
};

export default VerifyAge;
