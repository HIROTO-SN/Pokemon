/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ContentBase = ({ fontSize, children }) => {
	/***** CSS ******/
	const main_table = (fontSize) => css`
		width: 600px;
		text-align: center;

		td {
			font-size: ${fontSize};
		}
	`

	/***** JSX ******/
	return (
		<td>
			<table css={main_table(fontSize)} border="0">
				<tbody>
					<tr>
						{children}
					</tr>
				</tbody>
			</table>
    </td>
	)
}

export default ContentBase