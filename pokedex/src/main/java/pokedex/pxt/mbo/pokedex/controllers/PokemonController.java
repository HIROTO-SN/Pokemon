package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.Pagination;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsInfoDto;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;

@RestController
@RequestMapping("/pokedex")
@CrossOrigin(origins = "http://localhost:3000")
public class PokemonController {

	@Autowired
	PokemonDataService pokemonDataService;

	/**
	 * POKEMON一覧データ取得
	 * 
	 * @param request <SearchDto> リクエスト
	 * @return response <PokemonDto>
	 */
	@PostMapping("/pokeList")
	public ResponseEntity<List<PokemonDto>> getPokemonList(@RequestBody SearchDto searchDto) {
		List<PokemonDto> response = pokemonDataService.getPokemonList(searchDto);
		if (response.size() == 0) {
			return new ResponseEntity<List<PokemonDto>>(response, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<PokemonDto>>(response, HttpStatus.OK);
		}
	}

	/**
	 * POKEMON詳細データ取得
	 * 
	 * @param request <int> ポケモンId
	 * @return response <PokemonDetailsDto>
	 */
	@GetMapping("/pokedetails")
	public ResponseEntity<PokemonDetailsInfoDto> getPokemonDetails(@RequestParam("pokemonName") String pokemonName) {
		PokemonDetailsInfoDto response = pokemonDataService.getPokemonDetails(pokemonName);
		if (response == null) {
			return new ResponseEntity<PokemonDetailsInfoDto>(response, HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<PokemonDetailsInfoDto>(response, HttpStatus.OK);
		}
	}

	/**
	 * 前後のPOKEMONデータ取得
	 * 
	 * @param request <int> ポケモンId
	 * @return response <PokemonDto>
	 */
	@GetMapping("/pokePrevNext")
	public ResponseEntity<List<Pagination>> getPokemonPrevNextData(@RequestParam("pokemonName") String pokemonName) {
		List<Pagination> response = pokemonDataService.getPokemonPrevNextData(pokemonName);
		return new ResponseEntity<List<Pagination>>(response, HttpStatus.OK);
	}

}
