/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  alertBox,
  alertError,
  alertH3,
} from "../../../../components/CommonCss/Layout";
import { useNoResult } from "../../contexts/SearchContext";

const Alert = () => {
  /***** Definition ******/
  const resultStatus = useNoResult();

  const alertShow = (disp) => css`
    display: ${disp === 200 && "none"};
    margin-bottom: 20px;

    & p {
      color: #919191;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      font-weight: 500;
      line-height: 125%;
      margin: 0.5em 0 0 1em;
			> strong {
				margin: 0.5em 0;
				font-family: "Flexo-Bold", arial, sans-serif;
			}
    }

    > ul {
      margin: 0.5em;
      list-style-type: disc;
    }
  `;

  /***** JSX ******/
  return (
    resultStatus && (
      <div css={[alertBox, alertError(1), alertShow(resultStatus)]}>
        <h3 css={alertH3(1)}>
          {resultStatus === 500
            ? "Server connection failed! Please try again a little bit later!"
            : resultStatus === 204
            ? "No Pokémon Matched Your Search!"
            : ""}
        </h3>
        <p>
          <strong>
            Try these suggestions to find a Pokémon:
          </strong>
        </p>
        <ul>
          <li>
            <p>Reduce the number of search parameters</p>
          </li>
          <li>
            <p>Search for only one Pokémon type at a time</p>
          </li>
          <li>
            <p>Try multiple body sizes and shapes</p>
          </li>
        </ul>
      </div>
    )
  );
};

export default Alert;
