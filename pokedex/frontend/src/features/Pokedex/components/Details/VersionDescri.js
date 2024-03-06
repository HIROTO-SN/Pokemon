/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

/**
 * 【COMPONENT】
 * Version Description
 */
const VersionDescri = ({ descriFlg = "x" }) => {
  /***** Definition ******/
  const cssObj = useCssVersion();

  /* ★ 後で消すテストデータ */
  const description_list = [
    {
      version: "x",
      description:
        "While it basks in the sun, it can convert the light into energy. As a result, it is more powerful in the summertime.",
			disp: descriFlg === "x" ? true : false,
    },
    {
      version: "y",
      description:
        "By spreading the broad petals of its flower and catching the sun’s rays, it fills its body with power.",
			disp: descriFlg === "y" ? true : false,
    },
  ];

  /***** HTML ******/
  return (
    <div>
      {description_list.map((desc) => (
        <p key={desc.version} css={cssObj.descriInfo(desc.disp)}>
					{desc.description}
				</p>
			))}
    </div>
  );
};

/**
 * CSS定義
 */
const useCssVersion = () => {
  const descriInfo = (disp) => css`
    display: ${disp ? "block" : "none"};
    opacity: 1;
    font-family: "Flexo-Medium", arial, sans-serif;
    color: #212121;
    font-size: 112.5%;
    line-height: 150%;
  `;

  return {
    descriInfo,
  };
};

export default VersionDescri;
