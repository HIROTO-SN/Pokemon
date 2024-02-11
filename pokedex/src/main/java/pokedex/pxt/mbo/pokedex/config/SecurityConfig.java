package pokedex.pxt.mbo.pokedex.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

	// private UserDetailsService userDetailsService;
	
	// SecurityConfig(UserDetailsService userDetailsService) {
	// 	this.userDetailsService = userDetailsService;
	// }

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
		return configuration.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		http.csrf((csrf -> csrf.disable()))
						.authorizeHttpRequests(authorize -> authorize
							.requestMatchers(HttpMethod.GET, "/pokedex/**").permitAll()
							.requestMatchers(HttpMethod.GET, "/items").permitAll()
							.requestMatchers(HttpMethod.GET, "/api/**").permitAll()
							.requestMatchers("/session/**").permitAll()
							.requestMatchers("/api/auth/**").permitAll()
							.anyRequest().authenticated()
						).httpBasic(Customizer.withDefaults());
		return http.build();
	}
	
	// @Bean
	// public UserDetailsService users() {
	// 	UserDetails admin = User.builder()
	// 													.username("admin")
	// 													.password(passwordEncoder().encode("admin"))
	// 													.roles("ADMIN")
	// 													.build();
	// 	UserDetails user = User.builder()
	// 													.username("user")
	// 													.password(passwordEncoder().encode("user"))
	// 													.authorities("USER")
	// 													.build();
	// 	return new InMemoryUserDetailsManager(admin, user);
	// }
	
	@Bean
	public static PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
