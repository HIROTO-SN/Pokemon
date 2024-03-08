package pokedex.pxt.mbo.pokedex.services;
import java.util.List;

import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsDto;

@Service
public interface PokemonDataService {
	public List<PokemonDto> getPokemonList(SearchDto searchDto);
	public List<PokemonDetailsDto> getPokemonDetails(int pokemonId);
	public List<PokemonDto> getPokemonPrevNextData(int pokemonId);
}
