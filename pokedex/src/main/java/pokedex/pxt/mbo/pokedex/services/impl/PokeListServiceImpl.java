package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pokedex.pxt.mbo.pokedex.common.*;
import pokedex.pxt.mbo.pokedex.entity.Pokemon;
import pokedex.pxt.mbo.pokedex.payload.SearchDto;
import pokedex.pxt.mbo.pokedex.services.PokeListService;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@Service
public class PokeListServiceImpl implements PokeListService {

	private RestTemplate restTemplate = new RestTemplate();
	@Autowired
	private SessionService sessionService;

	public Pokemon getAllPokemonData() {
		String url = String.format(ApiEndPoints.URL_GET_POKELIST_ALL,
				Constants.POKE_PARAM.get("offset"),
				Constants.POKE_PARAM.get("limit"));
		return restTemplate.getForObject(url, Pokemon.class);
	}

	public Pokemon getSearchPokeData(SearchDto searchDto) {
		Pokemon pokemon = sessionService.getPokeDataList().getBody();
		return pokemon;
	}
}
