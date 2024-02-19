import { getSearchedPokemonList } from "../../../components/api/PokemoApi";

/**
 * Searchボタン押下時共通処理
 */
export const clickSearchHandler = (search) => {
	const element = document.getElementById("result");
	getSearchedPokemonList(search);
	element.scrollIntoView({
		behavior: 'smooth'  
	});
}