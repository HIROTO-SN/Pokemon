import axios from "axios";
import { POKEURL } from "../../constants/ApiUrls";

/**
 * Pokemonリストを取得する
 */
export const getPokemonList = async (search) => {
  try {
    return await axios.post(POKEURL.POKELIST, search, {
      headers: {
        Accept: "application/vnd.poke.v1+json",
      },
    });
  } catch (e) {
    console.log("サーバーとの通信に失敗:" + e);
  }
};

/**
 * Pokemon初回表示時20件データ取得
 */
export const getPokemonImages = (url) => {
  return new Promise((resolve) => {
    fetch(url, {
      headers: {
        Accept: "application/vnd.poke.v1+json",
      },
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((reason) => console.error("アクセス拒否：", reason));
  });
};

/**
 * Pokemon検索データを取得
 * @param {Object} search - 検索内容格納オブジェクト
 */
export const getSearchedPokemonList = async (search) => {
  try {
    const response = await axios.post(POKEURL.POKELIST, search, {
      headers: {
        Accept: "application/vnd.poke.v1+json",
      },
    });
    if (response.status === 204) {
      // 検索結果が1件も見つからなかった時
      return { ...response, data: [] };
    } else if (response.status === 200) {
      // 検索結果が見つかった時
      return response;
    }
  } catch (e) {
    return { data: [], status: 500 };
  }
};

/**
 * PokemonNameに紐づくPokemon詳細を取得する
 * @param {String} pokeName - PokemonName
 */
export const getPokemonDetails = async (pokeName) => {
  try {
    return await axios.get(
      POKEURL.POKEDETAILS,
      {
        params: {
          pokemonName: pokeName,
        },
      },
      {
        headers: {
          Accept: "application/vnd.poke.v1+json",
        },
      }
    );
  } catch (e) {
    console.log("サーバーとの通信に失敗:" + e);
  }
};

/**
 * PokemonNameに紐づくPokemon詳細を取得する
 * @param {String} pokeName - PokemonName
 */
export const getPokemonPrevNext = async (pokeName) => {
  try {
    return await axios.get(
      POKEURL.POKE_PREV_NEXT,
      {
        params: {
          pokemonName: pokeName,
        },
      },
      {
        headers: {
          Accept: "application/vnd.poke.v1+json",
        },
      }
    );
  } catch (e) {
    console.log("サーバーとの通信に失敗:" + e);
  }
};
