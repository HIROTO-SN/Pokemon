package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.repository.PokemonRepository;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;

@Service
public class PokemonDataServiceImpl implements PokemonDataService {

	@Autowired
	private PokemonRepository pokemonRepository;

	public List<PokemonDto> getSearchedPokemonList(SearchDto searchDto) {
		List<PokemonDto> pokemonDto = new ArrayList<PokemonDto>();
		pokemonRepository.findByPokemonNameLike("%" + searchDto.getSearchInput() + "%")
			.ifPresent(poke -> {
				poke.forEach(_poke -> {
					PokemonDto _pokemonDto = new PokemonDto();
					_pokemonDto.setPokemonId(_poke.getPokemonId());
					_pokemonDto.setFormId(_poke.getFormId());
					_pokemonDto.setPokemonName(_poke.getPokemonName());
					pokemonDto.add(_pokemonDto);
				});
			});
		return pokemonDto;
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
