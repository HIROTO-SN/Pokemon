package pokedex.pxt.mbo.pokedex.services.impl;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pokedex.pxt.mbo.pokedex.common.ApiEndPoints;
import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.Abilities;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@Service
public class SessionServiceImpl implements SessionService {

	private RestTemplate rest;
	private List<PokemonDto> pokemonDto;

	public SessionServiceImpl() {
		this.rest = new RestTemplate();
		this.pokemonDto = new ArrayList<PokemonDto>();
	}

	/*
	 * ログインユーザー情報取得
	 */
	@Override
	public void setLoginUserData(SessionDto sessionData) {
		String endpoint = ApiEndPoints.URL_SET_SESSION_USERDATA;
		rest.postForObject(endpoint, sessionData, SessionDto.class);
	}

	/*
	 * ログインユーザー情報取得
	 */
	@Override
	public ResponseEntity<SessionDto> getLoginUserData() {
		String endpoint = ApiEndPoints.URL_GET_SESSION_USERDATA;
		return rest.getForEntity(endpoint, SessionDto.class);
	}

	/*
	 * 全てのポケモンデータをセットする
	 */
	@Override
	public PokemonDto setAllPokemonData() {
		
		for (int i = 1; i <= Constants.POKE_PARAM.get("LIMIT"); i++) {
			String url = String.format(ApiEndPoints.URL_GET_POKE_DETAILS, i);
			// PokeAPIから対象ポケモンデータの詳細を抽出
			Map<String, Object> response = rest.getForObject(url, Map.class);
			// Dtoオブジェクトにデータを格納	
			PokemonDto poke = new PokemonDto();
			List<Abilities> abilities = setAbilities((List<Object>)response.get("abilities"));
			
		
			poke.setNo((int)response.get("order"));
			poke.setName((String)response.get("name"));
			poke.setAbilities(abilities);
			poke.setWeight((int)response.get("weight"));
			poke.setHeight((int)response.get("height"));
			// pokemonDto.setName(res.getBody());
			String a = "a";
		}
		return null;
	}

	/*
	 * 全てのポケモンデータを取得する
	 */
	@Override
	public ResponseEntity<PokemonDto> getAllPokeData() {
		String endpoint = ApiEndPoints.URL_GET_SESSION_POKEDATA;
		return rest.getForEntity(endpoint, PokemonDto.class);
	}

	/*
	 * Abilitiesをセットする
	 */
	public List<Abilities> setAbilities(List<Object> ability) {
		ability.forEach(list -> {
			System.out.println(list);
		});
		return null;
	}
}
