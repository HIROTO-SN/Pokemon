/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { column12, push1 } from "../../../../components/CommonCss/Layout";
import { dogEarBl } from "../../../../components/CommonCss/PokedexCss";
import { noEvolution } from "../../../../constants/ConstantsGeneral";
import EvolutionList from "./Evolution-list";

const Evolution = ({ evolutionList, evolutionPoint }) => {
  /***** Definition ******/
  const c = useCssEvolution();

  /***** JSX ******/
  return (
    <div css={[push1, column12, c.evolutionWrapper, dogEarBl]}>
      <h2>Evolutions</h2>
      {evolutionPoint === 1 && <p>{noEvolution}</p>}
      {evolutionList !== null &&
        evolutionList.map((list1, i) => (
          <ul key={"evolution_1_ul" + i} css={c.evolution_ul}>
            <li
              css={c.evolution_li(
                evolutionPoint,
                list1.stage,
                list1.next != null && list1.next.length > 0,
                list1.next != null && list1.next === 2
              )}
              key={"evolution_1_list" + i}
            >
              <EvolutionList evolutionPoint={evolutionPoint} list={list1} />
            </li>
            {list1.next !== null && (
              <ul key={"evolution_2_ul" + i} css={c.evolution_ul_stage2_3(list1.next.length > 1, evolutionPoint)}>
                {list1.next.map((list2, i) => (
                  <>
                    <li
                      css={c.evolution_li(
                        evolutionPoint,
                        list2.stage,
                        list2.next != null && list2.next.length > 0,
                        list2.next != null && list2.next.length === 2
                      )}
                      div
                      key={"evolution_2_list" + i}
                    >
                      <EvolutionList
                        evolutionPoint={evolutionPoint}
                        list={list2}
                      />
                    </li>
                    {list2.next != null && (
                      <ul key={"evolution_3_ul" + i} css={c.evolution_ul_stage2_3(list2.next.length > 1, evolutionPoint)}>
                        {list2.next.map((list3, i) => (
                          <li
                            css={c.evolution_li(
                              evolutionPoint,
                              list3.stage,
                              list3.next != null && list3.next.length > 0,
                              list3.next != null && list3.next.length === 2
                            )}
                            key={"evolution_3_list" + i}
                          >
                            <EvolutionList
                              evolutionPoint={evolutionPoint}
                              list={list3}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ))}
              </ul>
            )}
          </ul>
        ))}
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

  /**
   * 進化リスト大元ul
   */
  const evolution_ul = css`
    clear: both;
  `;

  /**
   * 進化リストステージ2&3のul
   * @param {Boolean} flg - ステージ２にリストが２つ以上存在するかどうか
   * @param {Number} p - Evolutionポイント
   */
  const evolution_ul_stage2_3 = (flg, p) => ({
    ...(flg && {
      float: "left",
      marginRight: "-100%",
      width: (p === 81 || p === 31) ? "70.98%" : "92.75%",
      marginLeft: p === 31 ? "37.8325%" : "7.2525%",
      marginTop: "1em",
      marginBottom: p === 81 ? "2em" : "3em",
      position: "relative",
    }),
  });

  /**
   * 進化リスト位置、それぞれのImgファイルの幅調整
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @param {Boolean} flg_after - 方向矢印（＞）を付与するか判定(1個目)
   * @param {Boolean} flg_before - 方向矢印（＞）を付与するか判定(2個目)
   */
  const evolution_li = (p, s, flg_after, flg_before) => css`
    position: relative;
    float: left;
    margin-top: ${calcMarginTop(p, s)};
    margin-right: ${calcMarginRight(p, s)};
    margin-bottom: ${calcMarginBottom(p, s)};
    margin-left: ${calcMarginLeft(p, s)};
    width: ${calcWidth(p, s)};
    ${flg_before && arrowStageBefore(p)};
    ${flg_after && arrowStageAfter(p, flg_before)};
  `;

  const arrowStageBefore = (p) => css`
    :before {
      right: ${arrowStagePosition(p)};
      top: 73%;
      content: ">";
      font-size: 450%;
      position: absolute;
      transform: scale(0.6, 1.2);
    }
  `;

  const arrowStagePosition = (p) => {
    if (p === 31) {
      return "-35%";
    } else if (p < 100) {
      return "-50%";
    } else {
      return "-40%";
    }
  }

  const arrowStageAfter = (p, flg) => css`
    :after {
      right: ${arrowStagePosition(p)};
      top: ${flg ? "-40%" : "11%"};
      content: ">";
      font-size: 450%;
      position: absolute;
      transform: scale(0.6, 1.2);
    }
  `;

  /**
   * TOPマージン計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginTop = (p, s) => {
    switch (p) {
      case 1:
      case 11:
      case 111:
      case 222:
      default:
        return "1em";
      case 31:
        return "2em";
      case 81:
        return s === 1 ? "8em" : "0";
      case 211:
        return s === 1 ? "8em" : s === 2 ? "8em" : "0";
    }
  };

  /**
   * RIGHTマージン計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginRight = (p, s) => {
    switch (p) {
      case 1:
      case 11:
      case 111:
      case 222:
      default:
        return "-100%";
      case 31:
        return s === 1 ? "-100%" : "6.06%";
      case 81:
        return "2.06%";
      case 211:
        return s === 1 ? "-100%" : s === 2 ? "-100%" : "0";
    }
  };

  /**
   * BOTTOMマージン計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginBottom = (p, s) => {
    switch (p) {
      case 1:
      case 11:
      case 111:
      case 222:
      default:
        return "2em";
      case 31:
        return s === 1 ? "2em" : "0";
      case 81:
        return "5em";
      case 211:
        return s === 1 ? "2em" : s === 2 ? "2em" : "2em";
    }
  };

  /**
   * LEFTマージン計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginLeft = (p, s) => {
    switch (p) {
      case 1:
        return "29.0225%";
      case 11:
      case 22:
        if (s === 1) {
          return "21.7625%";
        } else if (s === 2) {
          return "58.0325%";
        }
        break;
      case 31:
      case 81:
        return s === 1 ? "3.6225%" : "0";
      case 111:
      case 222:
        if (s === 1) {
          return "7.2525%";
        } else if (s === 2) {
          return "39.9025%";
        } else if (s === 3) {
          return "72.5425%";
        }
        break;
      default:
        return "1em";
      case 211:
        return s === 1 ? "7.2525%" : s === 2 ? "39.9025%" : "72.5425%";
    }
  };

  /**
   * 横幅計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcWidth = (p, s) => {
    switch (p) {
      case 1:
        return "41.96%";
      case 1:
        return s === 1 ? "20.2%" : "27.46%";
      default:
        return "20.2%";
    }
  };

  return {
    evolutionWrapper,
    evolution_ul,
    evolution_ul_stage2_3,
    evolution_li,
  };
};

export default Evolution;
