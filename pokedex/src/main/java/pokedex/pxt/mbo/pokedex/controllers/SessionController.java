package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.services.SessionService;

@RestController
@RequestMapping("/session")
@CrossOrigin(origins = "http://localhost:3000")
public class SessionController {
	
	private HttpSession session;
	
	@Autowired
	SessionService sessionService;

	public SessionController(HttpSession session) {
		this.session = session;
	}

	@PostMapping("/login/set")
	public void setLoginInfo(@RequestBody SessionDto sessionDto, HttpServletRequest request) {
		session.invalidate();
		session = request.getSession();
		session.setAttribute("user_data", sessionDto);
	}

	@GetMapping("/login/get")
	public Object getLoginInfo() {
		return session.getAttribute("user_data");
	}

	// @PostMapping("/pokeList/set")
	// public void setPokeDataList(HttpServletRequest request) {
	// 	session = request.getSession();
	// 	List<PokemonDto> pokemon = sessionService.setAllPokemonData();
	// 	session.setAttribute("poke_data", pokemon);
	// }

	// @GetMapping("/pokeList/get")
	// public Object getPokeDataList() {
	// 	return session.getAttribute("poke_data");
	// }
}
