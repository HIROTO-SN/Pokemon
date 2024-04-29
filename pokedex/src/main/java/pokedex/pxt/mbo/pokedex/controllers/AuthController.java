package pokedex.pxt.mbo.pokedex.controllers;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pokedex.pxt.mbo.pokedex.payload.Account.CheckNamesDto;
import pokedex.pxt.mbo.pokedex.payload.Account.JwtAuthResponse;
import pokedex.pxt.mbo.pokedex.payload.Account.LoginDto;
import pokedex.pxt.mbo.pokedex.payload.Account.RegisterDto;
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
	@PostMapping(value = {"/login", "/signin"}, headers="AUTH-API-VERSION=1")
	public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginDto loginDto) {
		String token = authService.login(loginDto);
		JwtAuthResponse jwtAuthResponse = new JwtAuthResponse();
		jwtAuthResponse.setAccessToken(token);
		return ResponseEntity.ok(jwtAuthResponse);
	}

	// ログインアカウントの追加
	@PostMapping(value = {"/register", "/signup"}, headers="AUTH-API-VERSION=1")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		String response = authService.register(registerDto);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}
	
	// アカウント追加時のユーザー名、スクリーン名チェック
	@PostMapping(value="/checknames", headers="AUTH-API-VERSION=1")
	public ResponseEntity<List<String>> checkNames(@RequestBody CheckNamesDto CheckNamesDto) {
		List<String> response = authService.checkNames(CheckNamesDto);
		if (response.size() > 0) {
			return new ResponseEntity<List<String>>(response, HttpStatus.IM_USED);
		} else {
			return new ResponseEntity<List<String>>(response, HttpStatus.ACCEPTED);
		}
	}
}
