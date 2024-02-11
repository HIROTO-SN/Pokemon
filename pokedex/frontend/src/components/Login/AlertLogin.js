/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column12, push1 } from "../CommonCss/Layout";
import { useLoginError } from "../../contexts/LoginContext";

const Alert = ({ section }) => {
	/***** CSS ******/
	const validate = css`
		padding-top: 25px;
	`;

	// Alert枠内
  const alert = css`
		border: 2px solid #E3350D;
		border-radius: 10px;
    clear: both;
    color: #616161;
    margin-top: 0.5em;

		> h3 {
			color: #E3350D;
			margin: 0.5em 1em;
    	text-transform: none;
			font-size: 125%;
    	line-height: 125%;
			font-family: "Flexo-Medium",arial,sans-serif;
		}
	`;

	/***** State ******/
	const error = useLoginError();

	return (
		<>
			{error != "" &&
				<section css={[validate, section]}>
					<div css={[push1, column12]}>
						<div css={alert}>
							<h3>{error}</h3>
						</div>
					</div>
				</section>
			}
		</>
	)
}

export default Alert;