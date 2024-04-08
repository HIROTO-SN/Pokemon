package pokedex.pxt.mbo.pokedex.services;

import java.util.List;

import pokedex.pxt.mbo.pokedex.payload.Account.CheckNamesDto;
import pokedex.pxt.mbo.pokedex.payload.Account.LoginDto;
import pokedex.pxt.mbo.pokedex.payload.Account.RegisterDto;

public interface AuthService {
	String login(LoginDto LoginDto);
	String register(RegisterDto registerDto);
	List<String> checkNames(CheckNamesDto CheckNamesDto);
}
