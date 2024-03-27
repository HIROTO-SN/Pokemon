/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { STATS_INFO } from "../../../../constants/ConstantsGeneral";

const StatusInfo = ({ stat }) => {
  /***** Definition ******/
  const c = useCssStatus();

  // メーターバー表示用の空のリスト
  const meter_bar_list = [...Array(STATS_INFO.GAUGE_BAR_HEIGHT)].map(
    (_, i) => i + 1
  );

  /***** JS ******/
  /**
   * @param {Number} val - ステータス値
   * @return CSSでのtop位置計算結果
   */
  const meterBarCalc = (val) => {
    if (val === void 0 || val >= STATS_INFO.MAX) {
      return 0;
    } else {
      // ステータスバー1つずつのポイント重み計算
      const bar_each_point = Math.ceil(
        STATS_INFO.MAX / STATS_INFO.GAUGE_BAR_HEIGHT
      );
      // 引数で取得したステータス値がステータスバーの下から何番目かを計算
      const val_stat_position = Math.ceil(val / bar_each_point);
      // 四捨五入位置
      const digit = 4;
      // CSSでの位置ずけ計算しreturn
      return (100 - (100 / 15) * val_stat_position).toFixed(digit);
    }
  };

  /***** JSX ******/
  return (
    <div css={c.statusInfo}>
      <h3>Stats</h3>
      <ul>
        {stat.map((_stat) => (
          <li key={_stat.name}>
            <ul css={c.gauge}>
              <li css={c.meter(meterBarCalc(_stat.val))}></li>
              {meter_bar_list.map((meter) => (
                <li key={meter + "_meter"}></li>
              ))}
            </ul>
            <span css={c.meter_title}>{_stat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * CSS定義
 */
const useCssStatus = () => {
  // 全体囲い
  const statusInfo = css`
    background-color: #a4a4a4;
    border-radius: 10px;
    display: block;
    float: left;
    margin: 1em 0;
    width: 100%;
    // ステータス文字
    > h3 {
      font-family: "Flexo-Medium", arial, sans-serif;
      clear: both;
      color: #313131;
      float: left;
      font-size: 100%;
      margin: 0.75em 1.5em 1.5em;
      text-transform: none;
      line-height: 125%;
    }

    // ステータスバー全体
    > ul {
      display: block;
      /* background: blue; */
      clear: both;
      margin-bottom: 1.5em;
      position: relative;
      width: 100%;

      // ステータス1つ目
      > li:first-of-type {
        margin-left: 7.2525%;
      }
      // ステータス全て
      > li {
        margin: 0 1.5625% 1.25em 0;
        width: 12.95%;
        display: inline-block;
      }
    }
  `;

  // ステータスゲージのulタグ部
  const gauge = css`
    background: #fff;
    position: relative;
    overflow: hidden;

    & li:not(:first-of-type) {
      background: transparent;
      border-bottom: 0.25em solid #a4a4a4;
      height: 0.5em;
      width: 100%;
      position: relative;
      z-index: 2;
    }
  `;

  // ステータスゲージのメーター部
  // ステータスバーのCSS定義(初期状態)
  const slideDown = (stats_val) => keyframes`
    from {
      top: 100%;
    }
    to {
      top: ${stats_val === void 0 ? "100%" : stats_val + "%"}
    }
  `;

  // ステータスバーのCSS定義(アニメーション後)
  const meter = (stats_val) => css`
    top: 100%;
    background: #30a7d7;
    width: 100%;
    border: none;
    height: 120%;
    position: absolute;
    z-index: 1;
    animation: ${slideDown(stats_val)} 0.5s forwards;
    animation-delay: ${stats_val === void 0 ? "0s" : "0.5s"};
  `;

  // ステータスメーターの各タイトル
  const meter_title = css`
    font-family: "Roboto", arial, sans-serif;
    font-weight: bold;
    color: #212121;
    float: left;
    font-size: 62.5%;
    text-align: center;
    text-transform: none;
    width: 100%;
    @media (min-width: 1281px) and (max-width: 9999px) {
      font-size: 75%;
    }
  `;

  return {
    statusInfo,
    gauge,
    meter,
    meter_title,
  };
};

export default StatusInfo;
