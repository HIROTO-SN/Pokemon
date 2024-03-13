/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { column12, push1 } from "../../../../components/CommonCss/Layout";
import { dogEarBl } from "../../../../components/CommonCss/PokedexCss";
import { noEvolution } from "../../../../constants/ConstantsGeneral";
import EvolutionList from "./Evolution-list";

const Evolution = ({ evolutionList }) => {
  /***** Definition ******/
  const c = useCssEvolution();
  // console.log(evolutionList[0]);
  // console.log(evolutionList[0].next);
  evolutionList.map((list) => {
    console.log(list);
    console.log(list.next);
  });

  const [evolutionPoint, setEvolutionPoint] = useState(1);

  useEffect(() => {
    setEvolutionPoint(() => {
      switch (evolutionList.length) {
        case 1:
          if (evolutionList[0].next.length === 0) {
            // 進化なし
            return 1;
          } else if (evolutionList[0].next.length === 1) {
            // 進化あり
            const len = evolutionList[0].next;
            if (len[0].next.length === 0) {
              // 2段階進化
              return 2;
            } else if (len[0].next.length === 1) {
              // 3段階進化
              return 3;
            }
          } else {
            return 1;
          }
        default:
          return 1;
      }
    });
  }, []);

  /***** JSX ******/
  return (
    <div css={[push1, column12, c.evolutionWrapper, dogEarBl]}>
      <h2>Evolutions</h2>
      {evolutionPoint === 1 && <p>{noEvolution}</p>}
      {evolutionList.map((list1, i) => (
        <ul key={"evolution_1_list" + i}>
          <li
            css={c.evolution_li(
              evolutionPoint,
              list1.stage,
              list1.next.length > 0
            )}
          >
            <EvolutionList
              evolutionPoint={evolutionPoint}
              list={list1}
              arrowFlg={list1.next.length > 0}
            />
          </li>
          {list1.next.map((list2, i) => (
            <>
              <li
                css={c.evolution_li(
                  evolutionPoint,
                  list2.stage,
                  list2.next.length > 0
                )}
              >
                <EvolutionList
                  key={"evolution_2_list" + i}
                  evolutionPoint={evolutionPoint}
                  list={list2}
                  arrowFlg={list2.next.length > 0}
                />
              </li>
              {list2.next.map((list3, i) => (
              <li
                css={c.evolution_li(
                  evolutionPoint,
                  list3.stage,
                  list3.next.length > 0
                )}
              >
                <EvolutionList
                  key={"evolution_3_list" + i}
                  evolutionPoint={evolutionPoint}
                  list={list3}
                  arrowFlg={list3.next.length > 0}
                />
              </li>
              ))}
            </>
          ))}
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
   * 進化リスト位置、それぞれのImgファイルの幅調整
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @param {Boolean} flg - 方向矢印（＞）を付与するか判定
   */
  const evolution_li = (p, s, flg) => css`
    position: relative;
    float: left;
    margin-top: ${calcMarginTop(p, s)};
    margin-right: ${calcMarginRight(p, s)};
    margin-bottom: ${calcMarginBottom(p, s)};
    margin-left: ${calcMarginLeft(p, s)};
    width: ${calcWidth(p, s)};
    ${flg && arrowStage};
  `;

  const arrowStage = css`
    :after {
      right: -40%;
      top: 11%;
      content: ">";
      font-size: 450%;
      position: absolute;
      transform: scale(0.6, 1.2);
    }
  `;

  /**
   * TOPマージン計算
   * @param {Number} p - Evolutionポイント
   * @return {String} マージン比率（もしくはpx, em）
   * @param {Number} s - 進化stage（何番目の進化系か）
   */
  const calcMarginTop = (p) => {
    switch (p) {
      case 1:
      default:
        return "1em";
    }
  };

  /**
   * RIGHTマージン計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginRight = (p) => {
    switch (p) {
      case 1:
      default:
        return "-100%";
    }
  };

  /**
   * BOTTOMマージン計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcMarginBottom = (p) => {
    switch (p) {
      case 1:
      default:
        return "2em";
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
      case 3:
        if (s === 1) {
          return "7.2525%";
        } else if (s === 2) {
          return "39.9025%";
        } else if (s === 3) {
          return "72.5425%";
        }
      default:
        return "1em";
    }
  };

  /**
   * 横幅計算
   * @param {Number} p - Evolutionポイント
   * @param {Number} s - 進化stage（何番目の進化系か）
   * @return {String} マージン比率（もしくはpx, em）
   */
  const calcWidth = (p) => {
    switch (p) {
      case 1:
        return "41.96%";
      default:
        return "20.2%";
    }
  };

  return {
    evolutionWrapper,
    evolution_li,
  };
};

export default Evolution;
