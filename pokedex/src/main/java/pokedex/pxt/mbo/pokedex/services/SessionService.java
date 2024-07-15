package pokedex.pxt.mbo.pokedex.services;
import org.springframework.http.ResponseEntity;

import pokedex.pxt.mbo.pokedex.payload.SessionDto;

public interface SessionService {
	public void setLoginUserData(SessionDto sessionData);
	public ResponseEntity<SessionDto> getLoginUserData();
	// public List<PokemonDto> setAllPokemonData();
	// public ResponseEntity<PokemonDto> getAllPokeData();
}
