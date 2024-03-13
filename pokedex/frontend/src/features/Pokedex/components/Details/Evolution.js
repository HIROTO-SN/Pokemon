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
      {evolutionList.map((list, i) => (
        <ul key={"evolution_1_list" + i}>
          <EvolutionList
            evolutionPoint={evolutionPoint}
            list={list}
            arrowFlg={list.next.length > 0}
          />
          {list.next.length > 0 && (
            <ul>
              {list.next.map((_list, i) => (
                <EvolutionList
                  key={"evolution_2_list" + i}
                  evolutionPoint={evolutionPoint}
                  list={_list}
                  arrowFlg={list.next.length > 0}
                />
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

  return {
    evolutionWrapper,
  };
};

export default Evolution;
