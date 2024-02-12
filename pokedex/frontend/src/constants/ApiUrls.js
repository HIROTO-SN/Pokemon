/* API接続テスト用 */
export const itemUrl = "http://localhost:8080/items";

/* Signin/SignUp */
// ログイン認証
export const signinUrl = "http://localhost:8080/api/auth/signin";
// サインアップ
export const singupUrl = "http://localhost:8080/api/auth/signup";
// username, screenNameが使用可能かチェック
export const nameAvailabilityCheckUrl = "http://localhost:8080/api/auth/checknames";


/* Pokemonリスト */
// 全ポケモンリスト取得（最初の20）
export const pokemonAcessApiUrl = "https://pokeapi.co/api/v2/pokemon";
// 全ポケモンリストSession登録
export const pokemonSetUrl = "http://localhost:8080/session/pokeList/set";