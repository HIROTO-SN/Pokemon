package pokedex.pxt.mbo.pokedex.services;

import pokedex.pxt.mbo.pokedex.payload.LoginDto;
import pokedex.pxt.mbo.pokedex.payload.RegisterDto;

public interface AuthService {
	String login(LoginDto LoginDto);
	String register(RegisterDto registerDto);
}
