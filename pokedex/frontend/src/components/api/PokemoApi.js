// import axios from "axios";
import axios from "axios";
import { pokemonSetUrl } from "../../constants/ApiUrls";

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
 * Pokemon全データをセッションへ格納
 */
export const setPokemonSession = () => {
  axios
    .post(pokemonSetUrl)
    .catch((reason) =>
      console.error("サーバーとの通信に失敗：", reason)
    );
};
