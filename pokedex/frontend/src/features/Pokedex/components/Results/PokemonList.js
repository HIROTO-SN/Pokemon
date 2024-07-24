/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  capitalizeFirstLetter,
  extractString,
  setBackGroundForTypes,
  setFontColorForTypes,
} from "../../utils/ConvToolUtils";

const PokemonList = ({ pokemon }) => {
  /***** Definition ******/
  const [randomNum, setRandomNum] = useState(0);
  const [moveDirection, setMoveDirection] = useState(0);

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
  /**
   * 各ポケモンリストの初期表示時の動きを付ける
   * @param {Number} num - ランダムな数値
   * @param {Number} direction - 水平(0), 縦(1)
   * @returns
   */
  const slowShow = (num, direction) => keyframes`
    0% {
      opacity: 0;
      transform: translate(${num}px, ${num}px);
      transform: translate(${direction === 0 ? num : 0}px, ${direction === 1 ? num : 0}px);

    }
    50% {
      opacity: 0.35;
      transform: translate(${direction === 0 ? num / 3 : 0}px, ${direction === 1 ? num / 3 : 0}px);
    }
    100% {
      opacity: 1;
      transform: translate(0, 0);
    }
  `;

  // スタイル定義
  const cssAnimation = (num, direction) => css`
    animation: ${slowShow(num, direction)} 0.2s ease-in-out forwards;
  `;

  const LI_POKEMON = styled.li`
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

  const H5_NAMES = styled.h5`
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

  /***** JS ******/
  /**
   * 初期表示時のランダム整数生成→動きを付けるためのrandomuNumをセット
   */
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 121) - 15;
    setRandomNum(randomNum);
    const directionNum = Math.floor(Math.random() * 2);
    setMoveDirection(directionNum);
    console.log(directionNum);
  }, [pokemon]);

  /***** JSX ******/
  return (
    <div
      name={`${pokemon.pokemonId}_listPokemon`}
      css={cssAnimation(randomNum, moveDirection)}
    >
      <LI_POKEMON>
        <Link to={`/pokedex/${pokemon.pokemonName}`} state={pokemon.pokemonId}>
          <img
            src={
              "../pokemon/" +
              Number(pokemon.pokemonId).toString().padStart(4, "0") +
              ".png"
            }
            alt="pokemon_img"
          />
        </Link>
        <div css={pokemonInfo}>
          <p css={id}>
            <span>#</span>
            {Number(pokemon.pokemonId).toString().padStart(4, "0")}
          </p>
          <H5_NAMES>
            {capitalizeFirstLetter(extractString(pokemon.pokemonName, 0, " "))}
          </H5_NAMES>
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
      </LI_POKEMON>
    </div>
  );
};

export default PokemonList;
