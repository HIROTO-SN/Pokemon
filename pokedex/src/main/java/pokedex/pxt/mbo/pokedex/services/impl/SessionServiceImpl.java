package pokedex.pxt.mbo.pokedex.services.impl;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

import pokedex.pxt.mbo.pokedex.common.ApiEndPoints;
import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.Abilities;
import pokedex.pxt.mbo.pokedex.payload.pokemon.Types;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@Service
public class SessionServiceImpl implements SessionService {

	private RestTemplate rest;
	private List<PokemonDto> pokemonList;

	public SessionServiceImpl() {
		this.rest = new RestTemplate();
		this.pokemonList = new ArrayList<PokemonDto>();
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
	//  */
	// @Override
	// public List<PokemonDto> setAllPokemonData() {
		
	// 	for (int i = 1; i <= Constants.POKE_PARAM.get("LIMIT"); i++) {
	// 		String url = String.format(ApiEndPoints.URL_GET_POKE_DETAILS, i);
	// 		// PokeAPIから対象ポケモンデータの詳細を抽出
			
	// 		JsonNode jsonObj = rest.getForObject(url, JsonNode.class);
	// 		// Dtoオブジェクトにデータを格納	
	// 		PokemonDto poke = new PokemonDto();
	// 		List<Abilities> abilities = setAbilities(jsonObj.get("abilities"));
	// 		List<Types> types = setTypes(jsonObj.get("types"));
	// 		poke.setId(jsonObj.get("id").intValue());
	// 		poke.setName(jsonObj.get("name").textValue());
	// 		poke.setAbilities(abilities);
	// 		poke.setTypes(types);
	// 		poke.setWeight(jsonObj.get("weight").intValue());
	// 		poke.setHeight(jsonObj.get("height").intValue());
	// 		poke.setPicurl(jsonObj.get("sprites").get("other").get("official-artwork").get("front_default").textValue());
	// 		pokemonList.add(poke);
	// 	}
	// 	return pokemonList;
	// }

	// /*
	//  * 全てのポケモンデータを取得する
	//  */
	// @Override
	// public ResponseEntity<PokemonDto> getAllPokeData() {
	// 	String endpoint = ApiEndPoints.URL_GET_SESSION_POKEDATA;
	// 	return rest.getForEntity(endpoint, PokemonDto.class);
	// }

	// /*
	//  * Abilitiesをセットする
	//  */
	// public List<Abilities> setAbilities(JsonNode obj) {
	// 	List<Abilities> list = new ArrayList<Abilities>();
	// 	for (int i = 0; i < obj.size(); i++) {
	// 		Abilities ability = new Abilities();
	// 		ability.setName(obj.get(i).get("ability").get("name").textValue());
	// 		ability.setIsHidden(obj.get(i).get("is_hidden").booleanValue());
	// 		ability.setSlot(obj.get(i).get("slot").intValue());
	// 		list.add(ability);
	// 	}
	// 	return list;
	// }

	// /*
	//  * Typesをセットする
	//  */
	// public List<Types> setTypes(JsonNode obj) {
	// 	List<Types> list = new ArrayList<Types>();
	// 	for (int i = 0; i < obj.size(); i++) {
	// 		Types type = new Types();
	// 		type.setName(obj.get(i).get("type").get("name").textValue());
	// 		type.setSlot(obj.get(i).get("slot").intValue());
	// 		list.add(type);
	// 	}
	// 	return list;
	// }
}
