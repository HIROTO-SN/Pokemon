import { getAllPokemon, getSearchedPokemonList } from "../../../components/api/PokemoApi.js";
import { useSearchCondition, useSearchDispatch, useSetLoader, useSetPokemonData } from "../contexts/SearchContext.js";

/**
 * Pokedex画面での検索機能カスタムHOOKS
 */
const PokeSearchHook = () => {

	/***** Definition ******/
	const setLoader = useSetLoader();
	const setPokemonData = useSetPokemonData();
	const search = useSearchCondition();
	const searchDipatch = useSearchDispatch();

	/**
   * Searchボタン押下時共通処理
 	 */
	const fetchPokeData = async () => {
		await testPokemonData();
		// ローダーを表示
		setLoader(true);
		// ポケモンリストを取得
		const newSearch = { ...search, pageNumber: 0 }
		console.log("newSearch" + newSearch);
		const res = await getSearchedPokemonList(newSearch);
		setPokemonData(res.data);
		searchDipatch({ type: "setPageNumber", val: 1});
		// ローダーを非表示にし、スクロール処理
		setLoader(false);
		scrollToPokeList();
	}

	/**
	 * Pokemon一覧上部までスクロール
	 */
	const scrollToPokeList = () => {
		document.getElementById("result").scrollIntoView({
			behavior: 'smooth'
		});
	}
	
	const testPokemonData = async () => {
		let list = []
		for (var i = 1; i <= 1025; i++) {
			let data = getAllPokemon("https://pokeapi.co/api/v2/version/" + i + "/").data.height;
			list = [ ...list, data ];
		}
		console.log(list);
	}
	/***** Hooks return ******/
	return [
		fetchPokeData
	]
}

export default PokeSearchHook;


