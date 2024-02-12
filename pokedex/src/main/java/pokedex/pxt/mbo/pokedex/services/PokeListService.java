package pokedex.pxt.mbo.pokedex.services;

import org.springframework.stereotype.Service;
import pokedex.pxt.mbo.pokedex.entity.Pokemon;
import pokedex.pxt.mbo.pokedex.payload.SearchDto;

@Service
public interface PokeListService {

	public Pokemon getAllPokemonData();
	public Pokemon getSearchPokeData(SearchDto searchDto);
}
