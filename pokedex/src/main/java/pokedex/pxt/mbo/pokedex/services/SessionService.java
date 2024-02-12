package pokedex.pxt.mbo.pokedex.services;

import org.springframework.http.ResponseEntity;

import pokedex.pxt.mbo.pokedex.entity.Pokemon;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;

public interface SessionService {
	void setLoginUserData(SessionDto sessionData);
	ResponseEntity<SessionDto> getLoginUserData();
	ResponseEntity<Pokemon> getPokeDataList();
}
