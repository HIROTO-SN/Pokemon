import { getSearchedPokemonList } from "../../../components/api/PokemoApi.js";

/**
 * Pokedex画面での検索機能カスタムHOOKS
 * @param {Object} search - 検索内容
 * @param {Object} setPoke - ポケモンデータセット
 * @param {Object} dispatchSearch - 検索内容セット
 * @param {Boolean} actionType - 検索タイプ（search or surprise) デフォルトは"search"
 */
export const pokeSearchSubmit = async (
  search,
  setPoke,
  dispatchSearch,
  setNoResult,
  actionType = "search"
) => {
  setNoResult();
  const newSearch = {
    ...search,
    pokeIdList: [],
    pageNumber: 0,
    actionType: actionType,
  };
  const res = await getSearchedPokemonList(newSearch);
  setNoResult(res.status);
  console.log("status: " + res.status);

  if (res) {
    setPoke(res.data.pokemonList);
    dispatchSearch({
      type: "setPageNumber",
      pokeIdList: getPokeIdList(res.data.pokemonList),
      val: 1,
      actionType: actionType,
      hasMoreThanTwoPages: res.data.hasMoreThanTwoPages,
    });
  }
};

/**
 * 表示PokemonリストのIdを取得する
 * @param {Object} data - 現在の表示されているPokemonリスト
 * @return {List} idList - 表示されているpokemonIdリスト
 */
export const getPokeIdList = (data) => {
  if (data) {
    let idList = data.map((_data) => _data.pokemonId);
    return idList;
  }
  return [];
};


/**
 * Evolution ポイント計算
 * @param {List} data - evolutionリスト
 * @return {Number} point - Evolution ポイント 
 */
export const getEvolutionPoint = (data) => {
  // 初期値は進化なしの1
  let point = 1;
  for (var i = 0; i <= data.length; i++) {
    
  }
  return point;
};
