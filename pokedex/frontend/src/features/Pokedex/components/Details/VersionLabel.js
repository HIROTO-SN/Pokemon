/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { clearTable } from "../../../../components/CommonCss/Layout";
import { TbPokeball } from "react-icons/tb";
import { useSetVersionLabel, useVersionLabel } from "../../contexts/DetailContext";
import { versionLabelList } from "../../../../constants/ConstantsGeneral";

const VersionLabel = () => {
  /***** Definition ******/
  const c = useCssVersionLabel();
	const versionLabel = useVersionLabel();
	const setVersionLabel = useSetVersionLabel();

	/***** JS ******/
  /**
   * Versionラベルの切り替え処理
   * @param {event Object} e
   */
  const versionLabelSwitch = (e) => {
		const id = e.target.id
		setVersionLabel(id);
	};

  /***** JSX ******/
  return (
    <div css={clearTable}>
      {versionLabelList.map((version) => (
        <span key={version.name + "_version_label"}>
          <span
            id={version.name}
            key={version.name}
            css={c.versionLabel(version.name === versionLabel, version.name)}
            onClick={(e) => versionLabelSwitch(e)}
          >
          </span>
          <TbPokeball
            fill={version.name === "x" ? "#0072b0" : "#dd2d51"}
            viewBox="0 2 24 24"
            css={[c.pokeBall]}
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
    position: absolute;
    /* border-color: #17adff; */
    border-color: ${active ? (name === "x" ? "#17adff" : "#dd2d51") : "#fff"};
    border-style: solid;
    border-width: 4px;
    border-radius: 32px;
    height: 32px;
    margin: 0.75em 0.55em 0.5em -0.05em;
    text-align: center;
    width: 32px;
    cursor: pointer;
  `;

	// svgタグスタイル
  const pokeBall = css`
    font-size: 40px;
    margin: 0.35em 0.25em 0px -0.05em;
    z-index: -2;
  `;

  return {
    versionLabel,
    pokeBall,
  };
};

export default VersionLabel;
