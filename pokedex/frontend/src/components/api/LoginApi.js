// import axios from "axios";
import { itemUrl, pokemonAcessApiUrl, signinUrl } from "../../constants/ApiUrls";
import axios from "axios";
import { getAllPokemon } from "./PokemoApi";

// axiosでリクエストを送信
export async function loginAuth (username, password) {
  try {
    const res1 = await axios.get(pokemonAcessApiUrl);
    const res2 = await axios.get(itemUrl);
    const res = await axios.post(signinUrl, { username, password });
    console.log(res);
    console.log(res1);
    console.log(res2);
  } catch (e) {
    console.log("エラーです。:" + e);
  }
};