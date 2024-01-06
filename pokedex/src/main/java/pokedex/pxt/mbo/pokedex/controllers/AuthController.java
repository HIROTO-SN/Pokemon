package pokedex.pxt.mbo.pokedex.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.LoginDto;
import pokedex.pxt.mbo.pokedex.payload.RegisterDto;
import pokedex.pxt.mbo.pokedex.services.AuthService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	private AuthService authService;
	
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	// ログインREST API作成
	@PostMapping(value = {"/login", "/signin"})
	public ResponseEntity<String> login(@RequestBody LoginDto loginDto) {
		String response = authService.login(loginDto);
		return ResponseEntity.ok(response);
	}

	// ログインアカウントの追加
	@PostMapping(value = {"/register", "/signup"})
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
}
