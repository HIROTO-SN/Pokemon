/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { EXTERNAL_POKEAPI } from "../../../../constants/ApiUrls";
import {
  capitalizeFirstLetter,
  extractString,
  setBackGroundForTypes,
  setFontColorForTypes,
} from "../../utils/ConvToolUtils";

const PokemonList = ({ pokemon }) => {
  /***** CSS ******/
  // keyframes定義
  const mouseOverHop = keyframes`
    0% {
      opacity: 1;
      transform: translate(0, 0px);
    }
    100% {
      opacity: 1;
      transform: translate(0, -5px);
    }
  `;

  // スタイル定義
  const Li_pokemon = styled.li`
    /* transform: translateY(0px); */
    opacity: 1;
    top: 0px;
    left: 0px;
    display: block;
    float: left;
    position: relative;
    margin: 0 0.78125% 50px;
    width: 23.4375%;

    > a {
      background: #f2f2f2;
      float: left;
      display: block;
      position: relative;
      border-radius: 5px;
      width: 100%;
      padding-top: 100;
      cursor: pointer;

      > img {
        float: left;
        width: 100%;
        position: relative;
        top: 0;
      }
    }

    // ポケモン画像をMouseOverでゆらゆら揺らす
    :hover {
      animation: ${mouseOverHop} 0.2s ease-in-out;
    }
  `;

  const pokemonInfo = css`
    clear: both;
    top: -5px;
    padding-left: 7.2525%;
  `;
  const id = css`
    font-family: "Flexo-Bold", arial, sans-serif;
    color: #919191;
    font-size: 80%;
    padding-top: 2px;
    font-weight: 500;
    line-height: 125%;
    margin: 0.5em 0;
  `;

  const H5_names = styled.h5`
    font-family: "Flexo-Demi", arial, sans-serif;
    color: #313131;
    text-transform: none;
    font-size: 145%;
    margin-bottom: 5px;
    line-height: 125%;
    margin: 0.5em 0;
  `;

  const pill = (typeName) => css`
    font-family: "Flexo-Medium", arial, sans-serif;
    border-radius: 3px;
    line-height: 18px;
    max-width: 110px;
    margin: 0 1.5625% 0 0;
    width: 38.4375%;
    float: left;
    text-transform: none;
    font-size: 11px;
    text-align: center;
    background: ${setBackGroundForTypes(typeName)};
    color: ${setFontColorForTypes(typeName)};
  `;

  /***** JSX ******/
  return (
    <Li_pokemon>
      <Link to={`/pokedex/${pokemon.pokemonName}`} state={pokemon.pokemonId}>
        <img src={"../pokemon/" + Number(pokemon.pokemonId).toString().padStart(4, "0") + ".png"} />
      </Link>
      <div css={pokemonInfo}>
        <p css={id}>
          <span>#</span>
          {Number(pokemon.pokemonId).toString().padStart(4, "0")}
        </p>
        <H5_names>
          {capitalizeFirstLetter(extractString(pokemon.pokemonName, 0, " "))}
        </H5_names>
        {pokemon.types.map((_type) => {
          return (
            <div key={_type.name}>
              <span css={pill(_type.name)}>
                {capitalizeFirstLetter(_type.name)}
              </span>
            </div>
          );
        })}
      </div>
    </Li_pokemon>
  );
};

export default PokemonList;
