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
  setPoke([]);
  const newSearch = {
    ...search,
    pokeIdList: [],
    pageNumber: 0,
    actionType: actionType,
  };
  const res = await getSearchedPokemonList(newSearch);
  setPoke(res.data);
  setNoResult(res.status);
  dispatchSearch({
    type: "setPageNumber",
    pokeIdList: getPokeIdList(res.data),
    val: 1,
    actionType: actionType,
  });
};

/**
 * 表示PokemonリストのIdを取得する
 * @param {Object} data - 現在の表示されているPokemonリスト
 * @return {List} idList - 表示されているpokemonIdリスト
 */
export const getPokeIdList = (data) => {
  let idList = data.map((_data) => _data.pokemonId);
  return idList;
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
