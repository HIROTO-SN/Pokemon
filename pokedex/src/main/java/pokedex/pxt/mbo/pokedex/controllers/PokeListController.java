package pokedex.pxt.mbo.pokedex.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.services.PokeListService;


@RestController
@RequestMapping("/pokedex")
@CrossOrigin(origins = "http://localhost:3000")
public class PokeListController {
	
	@Autowired
	PokeListService pokeListService;

	@GetMapping("/search-pokeList")
	public PokemonDto getSearchPokemon(@RequestBody SearchDto searchDto) {
		return pokeListService.getSearchPokeData(searchDto);
	}
	
}
