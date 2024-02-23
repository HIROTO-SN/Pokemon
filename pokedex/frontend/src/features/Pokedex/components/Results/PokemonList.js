/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { capitalizeFirstLetter, setBackGroundForTypes, setFontColorForTypes } from "../../utils/ConvToolUtils";
import { EXTERNAL_POKEAPI } from "../../../../constants/ApiUrls";

const PokemonList = ({ pokemon }) => {
  const Li_pokemon = styled.li`
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

      > img {
        float: left;
        width: 100%;
        position: relative;
        top: 0;
      }
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

  /***** HTML ******/
	return (
    <Li_pokemon>
      <a>
        <img src={EXTERNAL_POKEAPI.IMAGE.replace("{0}", pokemon.pokemonId)} />
      </a>
      <div css={pokemonInfo}>
        <p css={id}>
          <span>#</span>
          {(Number(pokemon.pokemonId)).toString().padStart(4, "0")}
        </p>
        <H5_names>{capitalizeFirstLetter(pokemon.pokemonName)}</H5_names>
        {pokemon.types.map((_type) => {
          return (
            <div key={_type.name}>
              <span css={pill(_type.name)}>{capitalizeFirstLetter(_type.name)}</span>
            </div>
          );
        })}
      </div>
    </Li_pokemon>
  );
};

export default PokemonList;
