package pokedex.pxt.mbo.pokedex.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.entity.User;

@Service
public class UserService {

	private List<User> login = new ArrayList<>(Arrays.asList(
			new User("0001", "poke", "poke"),
			new User("0002", "poke2", "poke2"),
			new User("1111", "poke3", "poke3")));

	public List<User> getLoginInfo() {
		return this.login;
	}

	// @Override
	// public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	// 	User user;
	// 	login.forEach(data -> {
	// 		if (data.getUsername() == username) {
	// 			user = new User(data.getUserId(), data.getPassword(),data.getUsername());
	// 		}
	// 	});
		
	// 	return user;
	// }
}
