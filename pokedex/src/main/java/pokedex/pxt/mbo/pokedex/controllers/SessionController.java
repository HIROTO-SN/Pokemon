package pokedex.pxt.mbo.pokedex.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import pokedex.pxt.mbo.pokedex.entity.User;
import pokedex.pxt.mbo.pokedex.payload.SessionDto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/session/login")
public class SessionController {
	
	private HttpSession session;

	public SessionController(HttpSession session) {
		this.session = session;
	}

	@PostMapping("/set")
	public void setLoginInfo(@RequestBody SessionDto sessionDto, HttpServletRequest request) {
		session.invalidate();
		session = request.getSession();
		session.setAttribute("user_data", sessionDto.getUserdata());
	}

	@GetMapping("/get")
	public Object getLoginInfo() {
		return session.getAttribute("user_data");
	}
}
