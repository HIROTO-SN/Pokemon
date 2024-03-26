package pokedex.pxt.mbo.pokedex.common;

public class ApiEndPoints {
	
	// ログイン情報セットURL
	public static final String URL_SET_SESSION_USERDATA = "http://localhost:8080/session/login/set";
	// ログイン情報取得URL
	public static final String URL_GET_SESSION_USERDATA = "http://localhost:8080/session/login/get";
	// 全ポケモンデータ取得（セッションから）
	public static final String URL_GET_SESSION_POKEDATA = "http://localhost:8080/session/pokeList/get";
	// 全Pokemonデータ取得（外部APIから）
	public static final String URL_GET_POKELIST_ALL = "https://pokeapi.co/api/v2/pokemon?offset=%d&limit=%d";
	// 各ポケモン詳細データ
	public static final String URL_GET_POKE_DETAILS = "https://pokeapi.co/api/v2/pokemon/%d/";
}
