package pokedex.pxt.mbo.pokedex.services;
import java.util.List;

import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.Pagination;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsInfoDto;

@Service
public interface PokemonDataService {
	public List<PokemonDto> getPokemonList(SearchDto searchDto);
	public PokemonDetailsInfoDto getPokemonDetails(String pokemonName);
	public List<Pagination> getPokemonPrevNextData(String pokemonName);
}
