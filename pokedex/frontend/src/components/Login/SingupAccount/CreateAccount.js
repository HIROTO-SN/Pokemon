/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useCurrentPageDefiner, useInputAccountInfo, useSetInputAccountInfo } from "../../../contexts/SignupContext";
import { dogEarTl, fieldRequired, formWrapper } from "../../CommonCss/AccountCss";

const CreateAccount = () => {
	/***** CSS ******/
	const wrapperCustom = css`
		min-height: 1151px;
	`

  /***** context ******/
  const accountInfo = useInputAccountInfo();
  const setAccountInfo = useSetInputAccountInfo();
  const redefineCurrentPage = useCurrentPageDefiner();

	/***** JS ******/

	/***** HTML ******/
  return (
		<div css={[formWrapper, dogEarTl, wrapperCustom]}>
			<p css={fieldRequired}>All FIELDS ARE REQUIRED.</p>

		</div>
	)
};

export default CreateAccount;
