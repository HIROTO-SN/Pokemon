import { getSearchedPokemonList } from "../../../components/api/PokemoApi.js";

/**
 * Pokedex画面での検索機能カスタムHOOKS
 * @param {Object} search - 検索内容
 * @param {Object} setPoke - ポケモンデータセット
 * @param {Object} dispatchSearch - 検索内容セット
 * @param {Boolean} scrollFlg - スクロール制御
 */
export const pokeSearchSubmit = async (search, setPoke, dispatchSearch, scrollFlg = true) => {
	const newSearch = { ...search, pageNumber: 0 }
	const res = await getSearchedPokemonList(newSearch);
	setPoke(res.data);
	dispatchSearch({ type: "setPageNumber", val: 1});
	scrollFlg && scrollToPokeList();
}

/**
 * Pokemon一覧上部までスクロール
 */
export const scrollToPokeList = () => {
	document.getElementById("result").scrollIntoView({
		behavior: 'smooth'
	});
}

// /**
//  * Pokedex画面での検索機能カスタムHOOKS
//  */
// const usePokeSearchHook = () => {

// 	/***** Definition ******/
// 	const loader = useLoader();
// 	const setLoader = useSetLoader();
// 	const setPokemonData = useSetPokemonData();
// 	const search = useSearchCondition();
// 	const searchDipatch = useSearchDispatch();

// 	/**
//    * Searchボタン押下発火用関数
//  	 */
// 	const executeFetch = () => {
// 		// ローダーを表示し発火
// 		setLoader(true);
// 	}

// 	/**
//    * Searchボタン押下時共通処理
//  	 */
// 	useEffect(() => {
// 		const fetchPokeData = async () => {
// 			// ポケモンリストを取得
// 			const newSearch = { ...search, pageNumber: 0 }
// 			console.log("newSearch" + newSearch);
// 			const res = await getSearchedPokemonList(newSearch);
// 			setPokemonData(res.data);
// 			searchDipatch({ type: "setPageNumber", val: 1});
// 			// ローダーを非表示にし、スクロール処理
// 			setLoader(false);
// 			scrollToPokeList();
// 		}
// 		fetchPokeData();
// 	},[loader])


	
// 	// const testPokemonData = async () => {
// 	// 	let list = []
// 	// 	for (var i = 1; i <= 10; i++) {
// 	// 		let url = "https://pokeapi.co/api/v2/pokemon/" + i + "/";
// 	// 		let data = await getAllPokemon(url);
// 	// 		list = [ ...list, data.height ];
// 	// 	}
// 	// 	console.log(list);
// 	// }

// 	/***** Hooks return ******/
// 	return {
// 		executeFetch
// 	}
// }

// export default usePokeSearchHook;


