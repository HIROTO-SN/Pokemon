/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomSelectBase from "../../../../components/Common/CustomSelectBase";
import TypeWeaksBox from "../../../../components/Common/TypeWeakBox";
import {
  clearTable,
  column12,
  column6,
  container,
  noPaddingTop,
  overflowVisible,
  push1,
  push7,
  section,
  sliderWidet,
} from "../../../../components/CommonCss/Layout";
import { animeFadeIn } from "../../../../components/CommonCss/PokedexCss";
import UserDashboard from "../../../../components/Dashboard/UserDashboard";
import {
  getPokemonDetails,
  getPokemonPrevNext,
} from "../../../../components/api/PokemoApi";
import {
  useSelectedForm,
  useSetSelectedForm,
} from "../../contexts/DetailContext";
import Evolution from "./Evolution";
import ExploreMore from "./ExploreMore";
import { MatchHeightTablet } from "./MatchHeightTablet";
import Pagination from "./Pagination";
import ProfileImage from "./ProfileImage";
import StatusInfo from "./StatusInfo";
import VersionDescri from "./VersionDescri";
import VersionLabel from "./VersionLabel";
import { useLoadFlg, useSetLoadFlg } from "../../../../contexts/LoadContext";

const PokemonDetails = () => {
  /***** Definition ******/
  const params = useParams();
  const c = useCssPokemonDetails();

  const loadFlg = useLoadFlg();
  const setloadFlg = useSetLoadFlg();

  const selectedForm = useSelectedForm();
  const setSelectedForm = useSetSelectedForm();
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [evolutionDetails, setEvolutionDetails] = useState([]);
  const [pokePrevNextData, setPokePrevNextData] = useState([]);
  const [evolutionPoint, setEvolutionPoints] = useState(1);

  /* ★ 後で消すテストデータ */
  const pokeDataList = [
    {
      name: "Venusaur",
      id: 1,
      src: "../test/003.png",
      statList: [
        { name: "HP", val: 80 },
        { name: "Attack", val: 82 },
        { name: "Defense", val: 83 },
        { name: "Special Attack", val: 100 },
        { name: "Special Defense", val: 100 },
        { name: "Speed", val: 80 },
      ],
      attribute: {
        att_left: [
          { name: "Height", val: "6.07" },
          { name: "Weight", val: "220.5" },
          { name: "Gender", val: 2 },
        ],
        att_right: [
          { name: "Category", val: "Seed" },
          {
            name: "Abilities",
            val: [
              {
                name: "Overgrow",
                val: "Powers up Grass-type moves when the Pokémon’s HP is low.",
              },
              {
                name: "Thick Fat",
                val: "The Pokémon is protected by a layer of thick fat, which halves the damage taken from Fire- and Ice-type moves.",
              },
            ],
          },
        ],
        types: [
          { type_id: 5, name: "grass" },
          { type_id: 8, name: "poison" },
        ],
        weaks: [
          { type_id: 2, name: "fire" },
          { type_id: 6, name: "ice" },
          { type_id: 10, name: "flying" },
          { type_id: 11, name: "psychic" },
        ],
      },
    },
    {
      name: "Mega Venusaur",
      id: 2,
      src: "../test/003_f2.png",
      statList: [
        { name: "HP", val: 80 },
        { name: "Attack", val: 100 },
        { name: "Defense", val: 123 },
        { name: "Special Attack", val: 122 },
        { name: "Special Defense", val: 120 },
        { name: "Speed", val: 80 },
      ],
      attribute: {
        att_left: [
          { name: "Height", val: "7.1" },
          { name: "Weight", val: "342.8" },
          { name: "Gender", val: 0 },
        ],
        att_right: [
          { name: "Category", val: "Seed" },
          {
            name: "Abilities",
            val: [
              {
                name: "Overgrow",
                val: "Powers up Grass-type moves when the Pokémon’s HP is low.",
              },
              {
                name: "Thick Fat",
                val: "The Pokémon is protected by a layer of thick fat, which halves the damage taken from Fire- and Ice-type moves.",
              },
            ],
          },
        ],
        types: [
          { type_id: 5, name: "grass" },
          { type_id: 8, name: "poison" },
        ],
        weaks: [
          { type_id: 2, name: "fire" },
          { type_id: 6, name: "ice" },
          { type_id: 10, name: "flying" },
          { type_id: 11, name: "psychic" },
        ],
      },
    },
    {
      name: "Gigantamax Venusaur",
      id: 3,
      src: "../test/003_f3.png",
      statList: [
        { name: "HP", val: 80 },
        { name: "Attack", val: 82 },
        { name: "Defense", val: 83 },
        { name: "Special Attack", val: 100 },
        { name: "Special Defense", val: 100 },
        { name: "Speed", val: 80 },
      ],
      attribute: {
        att_left: [
          { name: "Height", val: "78.09" },
          { name: "Weight", val: "999999" },
          { name: "Gender", val: 3 },
        ],
        att_right: [
          { name: "Category", val: "Seed" },
          {
            name: "Abilities",
            val: [
              {
                name: "Overgrow",
                val: "Powers up Grass-type moves when the Pokémon’s HP is low.",
              },
              {
                name: "Thick Fat",
                val: "The Pokémon is protected by a layer of thick fat, which halves the damage taken from Fire- and Ice-type moves.",
              },
            ],
          },
        ],
        types: [
          { type_id: 5, name: "grass" },
          { type_id: 8, name: "poison" },
        ],
        weaks: [
          { type_id: 2, name: "fire" },
          { type_id: 6, name: "ice" },
          { type_id: 10, name: "flying" },
          { type_id: 11, name: "psychic" },
        ],
      },
    },
  ];

  // カスタムセレクトボックススタイル定義
  const formSelectStyle = {
    wrapper: {
      width: "41.96%",
      margin: "0 -100% 0 29.0225%",
      visibility: pokemonDetails.length > 1 ? "visible" : "none",
    },
    scroll: {
      backgroundColor: "#616161",
    },
    listStyle: {
      margin: "0.5em 0 0 0 ",
      color: "#fff",
      textAlign: "center",
    },
  };

  /***** JS ******/
  /**
   * 初期表示時処理
   * PokemonIdに紐づくPokemon詳細情報を取得
   */
  useLayoutEffect(() => {
    window.scroll({ top: 0, behavior: "instant" });
    const fetchPokemonData = async () => {
      // 初期表示用ポケモンリストを取得
      const res = await getPokemonDetails(params.pokemonName);
      const res_paging = await getPokemonPrevNext(params.pokemonName);
      setPokemonId(res.data.pokemonId);
      setPokemonDetails(res.data.pokemonDetails);
      setEvolutionDetails(res.data.evolutionDetails);
      setPokePrevNextData(res_paging.data);
      formSelectAction(1);
      setEvolutionPoints(getEvolutionPoints(res.data.evolutionDetails));
      setloadFlg(true);
    };
    fetchPokemonData();
  }, [params]);

  /**
   * リストアイテム選択時アクション
   * @param {Number} formId - 選択されたポケモンのフォームID
   */
  const formSelectAction = (formId) => {
    setSelectedForm(formId);
  };

  /**
   * 進化ポイント（CSS成形用）を再帰的に計算
   * @param {List} evolutionList - 進化リスト
   * @param {number} coef - 係数
   * @returns {number} - 進化ポイント
   */
  const getEvolutionPoints = (evolutionList, coef = 1) => {
    let evolutionPoint = coef * evolutionList.length;
    // ネストされた進化リストが存在する場合、再帰的に処理
    evolutionList.forEach((list) => {
      if (list.next !== null) {
        evolutionPoint += getEvolutionPoints(list.next, coef * 10);
      }
    });
    return evolutionPoint;
  };

  /***** HTML ******/
  return (
    <>
      {loadFlg && (
        <>
          <UserDashboard />
          <div css={container}>
            <section css={[c.pokedexHeader, (90, 0, 0, 0), clearTable]}>
              <Pagination
                pokeId={pokemonId}
                pokeName={params.pokemonName}
                pokePrevNextData={pokePrevNextData}
              />
            </section>
            <section
              css={[c.pokemonForm, section, overflowVisible, c.backgroundMod]}
            >
              {pokemonDetails.length > 1 && (
                <div css={[column12, push1]}>
                  <CustomSelectBase
                    style={formSelectStyle}
                    state={selectedForm}
                    list={pokemonDetails}
                    action={formSelectAction}
                  />
                </div>
              )}
            </section>
            <section css={[section, c.backgroundMod]}>
              <div css={[column6, push1, animeFadeIn(0.5)]}>
                {pokemonDetails.map((poke) => (
                  <div
                    css={c.isShow(poke.id === selectedForm)}
                    key={poke.name + "_form_attribute_left"}
                  >
                    <ProfileImage name={poke.name} src={poke.src} />
                    <StatusInfo stat={poke.statList} />
                  </div>
                ))}
              </div>
              <div css={[column6, push7]}>
                <div css={c.details_right}>
                  <VersionDescri pokemonDetails={pokemonDetails} />
                  <h3>Versions:</h3>
                  <VersionLabel pokemonDetails={pokemonDetails} />
                  {pokemonDetails.map((poke) => (
                    <div
                      css={c.isShow(poke.id === selectedForm)}
                      key={poke.name + "_form_attribute_right"}
                    >
                      <MatchHeightTablet attribute={poke.attribute} />
                      <div css={animeFadeIn(0.5)}>
                        <TypeWeaksBox id="type" list={poke.attribute.types} />
                        <TypeWeaksBox
                          id="weak"
                          list={poke.attribute.weaks}
                        />
                      </div>
                    </div>
                  ))}
                  <div css={clearTable}></div>
                </div>
              </div>
            </section>
            <section css={[section, c.backgroundMod]}>
              <Evolution
                evolutionList={evolutionDetails}
                evolutionPoint={evolutionPoint}
              />
            </section>
            <section css={[section, c.backgroundMod, noPaddingTop]}>
              <ExploreMore />
            </section>
            <section css={[sliderWidet]}></section>
          </div>
        </>
      )}
    </>
  );
};

/**
 * CSS定義
 */
const useCssPokemonDetails = () => {
  // ヘッダー部
  const pokedexHeader = css`
    padding-top: 90px;
    background: #fff;
    position: relative;
    max-width: 1280px;
    width: 100%;
    display: block;
    margin: 0 auto;
  `;
  // フォームプルダウン部
  const pokemonForm = css`
    padding-bottom: 50px !important;
  `;
  // バックグラウンド
  const backgroundMod = css`
    background-image: url("../background/content_bg.png") !important;
    background-position: left top !important;
    background-size: 100% 1px !important;
  `;

  // ディテール右部分囲い
  const details_right = css`
    display: block;
    float: left;
    width: 100%;
    > h3 {
      font-family: "Flexo-Medium", arial, sans-serif;
      color: #212121;
      float: left;
      font-size: 112.5%;
      line-height: 150%;
      margin: 1.125em 0 2em;
      text-transform: none;
    }
  `;

  /**
   * FormIdが複数ある場合に選択されたFormIdのディテールのみを表示し、その他を隠す
   * @param {Boolean} disp - 表示判定
   */
  const isShow = (disp) => css`
    display: ${disp ? "block" : "none"};
  `;

  return {
    pokedexHeader,
    pokemonForm,
    backgroundMod,
    details_right,
    isShow,
  };
};

export default PokemonDetails;
