package pokedex.pxt.mbo.pokedex.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.models.User;

@Service
public class LoginService {

	private List<User> login = new ArrayList<>(Arrays.asList(
		new User("0001", "poke", "poke"),
		new User("0002", "poke2", "poke2"),
		new User("1111", "poke3", "poke3")
	));

	public List<User> getLoginInfo() {
		return this.login;
	}
	
}
