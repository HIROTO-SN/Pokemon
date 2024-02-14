package pokedex.pxt.mbo.pokedex.services;

import org.springframework.stereotype.Service;
import pokedex.pxt.mbo.pokedex.payload.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;

@Service
public interface PokeListService {

	public PokemonDto getSearchPokeData(SearchDto searchDto);
}
