package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;


@RestController
@RequestMapping("/pokedex")
@CrossOrigin(origins = "http://localhost:3000")
public class PokemonController {
	
	@Autowired
	PokemonDataService pokemonDataService;

	@PostMapping("/search-pokeList")
	public ResponseEntity<List<PokemonDto>> getSearchedPokemon(@RequestBody SearchDto searchDto) {
		List<PokemonDto> response = pokemonDataService.getSearchedPokemonList(searchDto);
		if (response.size() == 0) {
			return new ResponseEntity<List<PokemonDto>>(response, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<PokemonDto>>(response, HttpStatus.OK);
		}
	}
}
