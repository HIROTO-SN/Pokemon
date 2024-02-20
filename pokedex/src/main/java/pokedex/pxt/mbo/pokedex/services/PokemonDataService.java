package pokedex.pxt.mbo.pokedex.services;
import java.util.List;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;

@Service
public interface PokemonDataService {
	public List<PokemonDto> getAllPokemonList();
	public List<PokemonDto> getSearchedPokemonList(SearchDto searchDto);
}
