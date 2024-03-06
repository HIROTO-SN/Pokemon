/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column12, push1 } from "../../../../components/CommonCss/Layout";
import { dogEarBl } from "../../../../components/CommonCss/PokedexCss";
import { noEvolution } from "../../../../constants/ConstantsGeneral";

const Evolution = ({ list }) => {
  /***** Definition ******/
  const cssObj = useCssEvolution();
	console.log(list.length);

  const dogEarPath = "../background/default-dog-ear.png";

  return (
    <div css={[push1, column12, cssObj.evolutionWrapper, dogEarBl(dogEarPath)]}>
			<h2>Evolutions</h2>
      {list.length === 0 ? (
        <div>
          <p>{noEvolution}</p>
          <ul>
						<li css={cssObj.evolution_li()}></li>
					</ul>
        </div>
      ) : (
        <>
					{/* <p>{noEvolution}</p>
          <ul></ul> */}
				</>
      )}
    </div>
  );
};

/**
 * CSS定義
 */
const useCssEvolution = () => {
  const evolutionWrapper = css`
    background: transparent url("../background/body_gray_bg.png");
    border-radius: 5px;
    position: relative;

    > h2 {
      font-family: "Roboto", arial, sans-serif;
      font-size: 137.5%;
      line-height: 125%;
      font-weight: 500;
      color: #fff;
      margin: 1em 0 0 1em;
      text-transform: none;
    }

    & p {
      color: #fff;
      margin: 0.5em 1.325em;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      font-weight: 500;
      line-height: 125%;
    }
  `;

	
	const evolution_li = () => css`
    position: relative;
		float: left;
		margin-top: 1em;
    margin-right: -100%;
    margin-bottom: 2em;
    margin-left: 29.0225%;
    width: 41.96%;
	`

  return {
    evolutionWrapper,
		evolution_li,
  };
};

export default Evolution;
