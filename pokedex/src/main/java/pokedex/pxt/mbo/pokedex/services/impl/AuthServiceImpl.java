package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.HashSet;
import java.util.Set;
import java.util.Random;
import java.util.List;
import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.entity.Role;
import pokedex.pxt.mbo.pokedex.entity.User;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;
import pokedex.pxt.mbo.pokedex.payload.CheckNamesDto;
import pokedex.pxt.mbo.pokedex.payload.LoginDto;
import pokedex.pxt.mbo.pokedex.payload.RegisterDto;
import pokedex.pxt.mbo.pokedex.repository.RoleRepository;
import pokedex.pxt.mbo.pokedex.repository.UserRepository;
import pokedex.pxt.mbo.pokedex.services.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private AuthenticationManager authenticationManager;
	private UserRepository userRepository;
	private RoleRepository roleRepository;
	private PasswordEncoder passwordEncoder;

	public AuthServiceImpl(AuthenticationManager authenticationManager,
												UserRepository userRepository,
												RoleRepository roleRepository,
												PasswordEncoder passwordEncoder) {
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public String login(LoginDto LoginDto) {
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
			LoginDto.getUsername(), LoginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		return "User Logged-in successfully";
	}

	@Override
	public String register(RegisterDto registerDto) {
		// ユーザー名重複チェック
		if (userRepository.existsByUsername(registerDto.getUsername())) {
			throw new PokedexException(HttpStatus.BAD_REQUEST, "Username already exists");
		}
		// メール重複チェック
		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new PokedexException(HttpStatus.BAD_REQUEST, "Email already exists");
		}

		User user = new User();
		user.setUsername(registerDto.getUsername());
		user.setEmail(registerDto.getEmail());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));		
		user.setBirthday(registerDto.getBirthday());
		user.setCountry(registerDto.getCountry());

		Set<Role> roles = new HashSet<>();
		Role userRole = roleRepository.findByName("ROLE_USER").get();
		roles.add(userRole);
		user.setRoles(roles);

		userRepository.save(user);

		return "User registered successfully!";
	}

	@Override
	public List<String> checkNames(CheckNamesDto CheckNamesDto) {
		// targetがUsernameかScreennameかを判定
		String target = CheckNamesDto.getTarget();
		String val = CheckNamesDto.getValue().strip();
		List<String> suggestNames = new ArrayList<String>();
		switch (target) {
			case "username":
				if (userRepository.existsByUsername(val)) {
					Random random = new Random();
					for (int i = 1; i <= 3; i ++) {
						suggestNames.add(val + String.valueOf(random.nextInt(1000000)));
					}
				}
				break;
			case "screenName":
				if (userRepository.existsByScreenName(val)) {
					Random random = new Random();
					for (int i = 1; i <= 3; i ++) {
						suggestNames.add(val + String.valueOf(random.nextInt(1000000)));
					}
				}
				break;
			default:
				suggestNames = null;
				break;
		}
		
		return suggestNames;
	}
}
