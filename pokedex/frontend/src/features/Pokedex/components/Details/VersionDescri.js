/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { useSelectedForm, useVersionLabel } from "../../contexts/DetailContext";

/**
 * 【COMPONENT】
 * Version Description
 */
const VersionDescri = ({ pokemonDetails }) => {
  /***** Definition ******/
  const c = useCssVersion();

  const versionLabel = useVersionLabel();
  const selectedForm = useSelectedForm();

  /***** HTML ******/
  return (
    <div>
      {pokemonDetails.map((poke) => (
        <div
          key={poke.name + "_versions"}
          css={c.descriptionShow(selectedForm === poke.id)}
        >
          {poke.versions.map((ver) => (
            <p key={ver.name} css={c.descriInfo(versionLabel === ver.name)}>
              {ver.val}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * CSS定義
 */
const useCssVersion = () => {
  const descriptionShow = (disp) => css`
    display: ${disp ? "block" : "none"};
  `;

  const descriInfo = (disp) => css`
    display: ${disp ? "block" : "none"};
    opacity: 1;
    font-family: "Flexo-Medium", arial, sans-serif;
    color: #212121;
    font-size: 112.5%;
    line-height: 150%;
    animation: ${fadeIn} 0.5s forwards;
  `;

  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  return {
    descriptionShow,
    descriInfo,
  };
};

export default VersionDescri;
