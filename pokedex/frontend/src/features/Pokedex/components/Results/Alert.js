/** @jsxImportSource @emotion/react */
import { alertBox, alertError, alertH3 } from "../../../../components/CommonCss/Layout";
import { useNoResult } from "../../contexts/SearchContext";

const Alert = () => {
	/***** Definition ******/
	const useResultStatus = useNoResult();

	/***** HTML ******/
  return (
    <div css={[alertBox, alertError(1)]}>
      <h3 css={alertH3(1)}>
				{useResultStatus === 500 ?
					"Server connection failed! Please try again a little bit later!"
					:
					"No Pokémon Matched Your Search!"
				}
			</h3>
    </div>
  );
};

export default Alert;
