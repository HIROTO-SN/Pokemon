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
// 全Pokemonリスト取得（External: 最初の20）
export const pokemonExternalApiUrl = "https://pokeapi.co/api/v2/pokemon";
// 外部APIからPokemonのImageを取得
export const EXTERNAL_POKEAPI = {
	// {0}をPokemonIdと置換してください
	IMAGE: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{0}.png"
}
// Pokemonリスト取得 (Internal）
export const POKEURL = {
	POKELIST: "http://localhost:8080/pokedex/pokeList",
	POKEDETAILS: "http://localhost:8080/pokedex/pokedetails",
	POKE_PREV_NEXT: "http://localhost:8080/pokedex/pokePrevNext",
}