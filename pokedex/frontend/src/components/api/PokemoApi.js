// import axios from "axios";
import axios from "axios";
import { POKEURL } from "../../constants/ApiUrls";

/**
 * PokemonApiから最初の20件のデータを取得
 * @param {String} url - https://pokeapi.co/api/v2/pokemon
 * @return {Object} Promise - APIアクセス結果
 */
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((reason) => console.error("アクセス拒否：", reason));
    }, 1000);
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((reason) => console.error("アクセス拒否：", reason))
  });
}

/**
 * Pokemon初回表示時20件データ取得
 */
export const getAllPokemonList = async () => {
  try {
    return await axios.get(POKEURL.ALL);
  } catch(e) {
    console.log("error:" + e);
  }
};

/**
 * Pokemon初回表示時20件データ取得
 */
export const getPokemonImages = (url) => {
  return new Promise((resolve) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((reason) => console.error("アクセス拒否：", reason))
  });
}

/**
 * Pokemon検索データを取得
 * @param {Object} search - 検索内容格納オブジェクト
 */
export const getSearchedPokemonList = (search) => {
  axios
    .post(POKEURL.SEARCH, search)
    .then((res) => {
      console.log("ポケモンリスト", res);
    })
    .catch((reason) =>
      console.error("サーバーとの通信に失敗：", reason)
    );
};
