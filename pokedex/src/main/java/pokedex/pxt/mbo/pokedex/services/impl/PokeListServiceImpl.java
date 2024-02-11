package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pokedex.pxt.mbo.pokedex.common.*;
import pokedex.pxt.mbo.pokedex.entity.PokeDto;
import pokedex.pxt.mbo.pokedex.services.PokeListService;

@Service
public class PokeListServiceImpl implements PokeListService {

	private RestTemplate restTemplate = new RestTemplate();

	public PokeDto getAllPokemonData() {
		String url = String.format(ApiEndPoints.URL_GET_POKELIST_ALL,
			Constants.POKE_PARAM.get("offset"),
			Constants.POKE_PARAM.get("limit")
		);
		return restTemplate.getForObject(url, PokeDto.class);
	}
}
