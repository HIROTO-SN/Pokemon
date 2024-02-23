import { getSearchedPokemonList } from "../../../components/api/PokemoApi.js";
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
	
	/***** Hooks return ******/
	return [
		fetchPokeData
	]
}

export default PokeSearchHook;


