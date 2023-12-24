// package pokedex.pxt.mbo.pokedex.services;

// import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

// import pokedex.pxt.mbo.pokedex.models.PokeDto;

// @Service
// public class PokeListService {
	
	
// 	/** PokeAPI リクエストURL */
// 	private static final String URL = "https://pokeapi.co/api/v2/pokemon";

// 	private RestTemplate restTemplate = new RestTemplate();
	
// 	public PokeDto getPokemonData() {
// 		return restTemplate.getForObject(URL, PokeDto.class);
// 	}
// }
