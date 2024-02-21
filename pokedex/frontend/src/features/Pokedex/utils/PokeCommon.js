import { getSearchedPokemonList } from "../../../components/api/PokemoApi";

/**
 * @param {Object} search - 検索内容格納オブジェクト
 * @param {Object} dispatch - 検索内容格納オブジェクト
 * Searchボタン押下時共通処理
 */
export const clickSearchHandler = (search, dispatch) => {
	// ポケモンリストを取得
	const pokemonList = getSearchedPokemonList(search);
	// "Load more Pokemon"用に最後のポケモンIdを保持
	dispatch("nextPoke", pokemonList.data.length)
	// 一覧上部までスクロール
	document.getElementById("result").scrollIntoView({
		behavior: 'smooth'
	});
}
