package pokedex.pxt.mbo.pokedex.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pokedex.pxt.mbo.pokedex.payload.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.repository.UserRepository;
import pokedex.pxt.mbo.pokedex.services.PokeListService;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@Service
public class PokeListServiceImpl implements PokeListService {

	private UserRepository userRepository;
	public PokemonDto getSearchPokeData(SearchDto searchDto) {
		return null;
	}
	// private RestTemplate restTemplate = new RestTemplate();
	// @Autowired
	// private SessionService sessionService;

	// public PokemonDto getSearchPokeData(SearchDto searchDto) {
	// 	Pokemon pokemon = sessionService.getPokeDataList().getBody();
	// 	if (searchDto.getSearchInput() != "") {
	// 		List<String> pokemon.getResults().Map()
	// 	} else {
	// 		return pokemon;
	// 	}
	// 	return null;
	// }
}
