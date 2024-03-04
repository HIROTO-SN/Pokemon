/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  column6,
  container,
  noPaddingTop,
  overflowVisible,
  push1,
  push7,
  section,
} from "../../../../components/CommonCss/Layout";
import Pagination from "./Pagination";
import PokemonForm from "./PokemonForm";
import ProfileImage from "./ProfileImage";
import StatusInfo from "./StatusInfo";

const PokemonDetails = () => {
  /***** Definition ******/
  const params = useParams();
  const location = useLocation();
  console.log(location.state);
  console.log(params);
  const cssObj = useCssPokemonDetails();
  // let book = getBook(parseInt(params.id, 10));

  /***** JS ******/
  useEffect(() => {});

  /***** HTML ******/
  return (
    <div css={container}>
      <section css={[cssObj.pokedexHeader, (90, 0, 0, 0), overflowVisible]}>
        <Pagination pokeId={location.state} pokeName={params.pokemonName} />
      </section>
      <section css={[cssObj.pokemonForm, section, overflowVisible, cssObj.backgroundMod]}>
        <PokemonForm />
      </section>
      <section css={[section, cssObj.backgroundMod]}>
        <div css={[column6, push1]}>
          <ProfileImage />
          <StatusInfo />
        </div>
        <div css={[column6, push7]}></div>
      </section>
      <section css={[section, cssObj.backgroundMod]}></section>
      <section css={[section, cssObj.backgroundMod, noPaddingTop]}></section>
    </div>
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
    background-image: url("../background/content_bg.png")!important;
    background-position: left top !important;
    background-size: 100% 1px !important;
  `;

  return {
    pokedexHeader,
    pokemonForm,
		backgroundMod,
  };
};

export default PokemonDetails;
