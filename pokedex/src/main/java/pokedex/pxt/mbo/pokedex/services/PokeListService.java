package pokedex.pxt.mbo.pokedex.services;

import org.springframework.stereotype.Service;
import pokedex.pxt.mbo.pokedex.entity.PokeDto;

@Service
public interface PokeListService {

	public PokeDto getAllPokemonData();
}
