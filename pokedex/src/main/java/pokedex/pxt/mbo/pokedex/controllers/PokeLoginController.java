package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.models.User;
import pokedex.pxt.mbo.pokedex.services.UserService;

@RestController
public class PokeLoginController {
	
	@Autowired
	UserService loginService;

	@GetMapping("/login/info")
	public List<User> getLoginInfo() {
		return loginService.getLoginInfo();
	}
}
