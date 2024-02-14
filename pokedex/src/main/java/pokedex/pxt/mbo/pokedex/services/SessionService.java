package pokedex.pxt.mbo.pokedex.services;

import org.springframework.http.ResponseEntity;

import pokedex.pxt.mbo.pokedex.payload.SessionDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;

public interface SessionService {
	public void setLoginUserData(SessionDto sessionData);
	public ResponseEntity<SessionDto> getLoginUserData();
	public PokemonDto setAllPokemonData();
	public ResponseEntity<PokemonDto> getAllPokeData();
}
