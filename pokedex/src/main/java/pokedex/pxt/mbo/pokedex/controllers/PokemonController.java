package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;

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

import lombok.extern.slf4j.Slf4j;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.Pagination;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsInfoDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.pokeList.PokemonDto;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;

@RestController
@RequestMapping("/pokedex")
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class PokemonController {

	@Autowired
	PokemonDataService pokemonDataService;

	/**
	 * POKEMON一覧データ取得
	 * 
	 * @param request <SearchDto> リクエスト
	 * @return response <PokemonDto>
	 */
	@PostMapping(value="/pokeList", produces="application/vnd.poke.v1+json")
	public ResponseEntity<PokemonDto> getPokemonList(@RequestBody SearchDto searchDto) {
		try {
			PokemonDto response = pokemonDataService.getPokemonList(searchDto);
			if (response == null) {
				return new ResponseEntity<PokemonDto>(response, HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<PokemonDto>(response, HttpStatus.OK);
			}
		} catch (RuntimeException ex) {
			log.error("Unexpected runtime exception occurred: {}", ex.getMessage(), ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception ex) {
			log.error("An unexpected error occurred", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * POKEMON詳細データ取得
	 * 
	 * @param request <int> ポケモンId
	 * @return response <PokemonDetailsDto>
	 */
	@GetMapping(value="/pokedetails", produces="application/vnd.poke.v1+json")
	public ResponseEntity<PokemonDetailsInfoDto> getPokemonDetails(@RequestParam("pokemonName") String pokemonName) {
		try {
			PokemonDetailsInfoDto response = pokemonDataService.getPokemonDetails(pokemonName);
			if (response == null) {
				return new ResponseEntity<PokemonDetailsInfoDto>(response, HttpStatus.NO_CONTENT);
			} else {
				return new ResponseEntity<PokemonDetailsInfoDto>(response, HttpStatus.OK);
			}
		} catch (Exception ex) {
			log.error("An unexpected error occurred", ex);
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * 前後のPOKEMONデータ取得
	 * 
	 * @param request <int> ポケモンId
	 * @return response <PokemonDto>
	 */
	@GetMapping(value="/pokePrevNext", produces="application/vnd.poke.v1+json")
	public ResponseEntity<List<Pagination>> getPokemonPrevNextData(@RequestParam("pokemonName") String pokemonName) {
		List<Pagination> response = pokemonDataService.getPokemonPrevNextData(pokemonName);
		return new ResponseEntity<List<Pagination>>(response, HttpStatus.OK);
	}

}
