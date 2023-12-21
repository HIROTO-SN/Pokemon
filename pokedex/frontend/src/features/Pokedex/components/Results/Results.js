/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { push1, column12 } from "../../../../components/CommonCss/Layout.js";
import Alert from "./Alert.js";
import LoadMore from "./LoadMore.js";
import PokemonList from "./PokemonList.js";
import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "../../../../utils/pokemon";


const Results = () => {
  const results = css`
    overflow: visible;
    position: relative;
    height: auto;
    position: 1em 0;
    background: transparent url("/icons/content_bg.png") left top;
    background-size: 100% 1px;
    display: block;
    margin: 0 auto;
    overflow: hidden;
    max-width: 1024px;
    width: 100%;

    :before {
      content: "";
      display: table;
    }
    :after {
      clear: both;
      content: "";
      display: table;
    }
  `;

  const resultsList = css`
    height: auto;
    float: left;
    margin-right: -100%;
    width: 85.49%;
    margin-left: 7.2525%;
    list-style: none;

    > li {
      opacity: 1;
      top: 0px;
      left: 0px;
      transform: matrix(1, 0, 0, 1, 0, 0);
      display: block;
      float: left;
      position: relative;
      margin: 0 0.78125% 50px;
      width: 23.4375%;
    }
  `;

	const noResults = css`
		display: none;
	`;

	const contentBlock = css`
		clear: both;
    display: block;
    width: 100%;
		float: left;
    margin: 1em 0 0 0;
    position: relative;
	`;

	const initialURL = "https://pokeapi.co/api/v2/pokemon";
	const [pokemonData, setPokemonData] = useState([]);

	useEffect(() => {
		const fetchPokemonData = async () => {
			// 全てのポケモンデータを取得
			let res = await getAllPokemon(initialURL);
			loadPokemon(res.results);
		};
		fetchPokemonData();
	}, []);

	const loadPokemon = async (data) => {
		const _pokemon = await Promise.all(
			data.map((pokemon) => {
				const pokemonRecord = getPokemon(pokemon.url);
				return pokemonRecord;
			})
		);
		setPokemonData(_pokemon);
	};

  return (
    <section css={results}>
      <ul css={resultsList}>
				{pokemonData.map((pokemon, i) => {
					return <PokemonList key={i} pokemon={pokemon} />;
				})}
			</ul>
      <div css={[push1, column12, noResults]}>
				<Alert/>
			</div>
      <div css={contentBlock}>
				<LoadMore/>
			</div>
    </section>
  );
};

export default Results;
