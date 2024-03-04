/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column12, push1 } from "../../../../components/CommonCss/Layout";
import { buttonBlack } from "../../../../components/CommonCss/AccountCss";

const PokemonForm = () => {
  /***** Definition ******/
  const cssObj = useCssPagination();

  /* ★ 後で消すテストデータ */
  const form_list = [
    { formId: 1, name: "Venusaur" },
    { formId: 2, name: "Mega Venusaur" },
    { formId: 3, name: "Gigantamax Venusaur" },
  ];

  /***** JS ******/
  return (
    <div>
      <div css={[column12, push1]}>
				<div css={[cssObj.selectStyle, buttonBlack]}></div>
			</div>
    </div>
  );
};

/**
 * CSS定義
 */
const useCssPagination = () => {
	const selectStyle  = css`
		float: left;
    margin-right: -100%;
    width: 41.96%;
    margin-left: 29.0225%;
	`
  return {
		selectStyle,
	};
};

export default PokemonForm;
