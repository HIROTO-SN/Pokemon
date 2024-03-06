/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { clearTable } from "../../../../components/CommonCss/Layout";
import { TbPokeball } from "react-icons/tb";
import { useSetVersionLabel, useVersionLabel } from "../../contexts/DetailContext";
import { versionLabelList } from "../../../../constants/ConstantsGeneral";

const VersionLabel = () => {
  /***** Definition ******/
  const cssObj = useCssVersionLabel();
	const versionLabel = useVersionLabel();
	const setVersionLabel = useSetVersionLabel();

	/***** JS ******/
  /**
   * Versionラベルの切り替え処理
   * @param {event Object} e
   */
  const versionLabelSwitch = (e) => {
		const id = e.target.id
		// console.log(e.target);
		// console.log(id);
		setVersionLabel(id);
	};

  /***** HTML ******/
  return (
    <div css={clearTable}>
      {versionLabelList.map((version) => (
        <span
					id={version.name}
					key={version.name}
          css={cssObj.versionLabel(version.name === versionLabel, version.name)}
          onClick={(e) => versionLabelSwitch(e)}
        >
          <TbPokeball
            fill={version.name === "x" ? "#0072b0" : "#dd2d51"}
            viewBox="0 2 24 24"
            css={cssObj.pokeBall}
          />
        </span>
      ))}
    </div>
  );
};

/**
 * CSS定義
 */
const useCssVersionLabel = () => {
  /**
   * バージョンラベルSpan囲い
   * @param {Boolean} active - クリック正負フラグ
   * @param {String} name - バージョン名
   */
  const versionLabel = (active, name) => css`
    border-color: ${active ? (name === "x" ? "#17adff" : "#dd2d51") : "#fff"};
    border-style: solid;
    border-width: 4px;
    border-radius: 32px;
    float: left;
    height: 32px;
    margin: 0.75em 0 0.75em 0.5em;
    text-align: center;
    width: 32px;
    cursor: pointer;
  `;

	// svgタグスタイル
  const pokeBall = css`
    font-size: 40px;
    margin: 0px 3px 0px -3px;
  `;

  return {
    versionLabel,
    pokeBall,
  };
};

export default VersionLabel;
