package pokedex.pxt.mbo.pokedex.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;

@Component
public class JwtTokenProvider {
	
	@Value("${secret-key}")
	private String jwtSecret;

	@Value("${expire-length}")
	private long jwtExpirationDate;

	// JwtToken生成
	public String generateToken(Authentication authentication) {
		String username = authentication.getName();

		Date currentDate = new Date();

		Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

		String token = Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(expireDate)
				.signWith(key())
				.compact();
		return token;
	}

	private Key key() {
		return Keys.hmacShaKeyFor(
			Decoders.BASE64.decode(jwtSecret)
		);
	}

	// ユーザー名をJwtTokenから取得
	public String getUsername(String token) {
		Claims claim = Jwts.parserBuilder()
								.setSigningKey(key())
								.build()
								.parseClaimsJws(token)
								.getBody();
		String username = claim.getSubject();
		return username;
	}

	// validate Token
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder()
						.setSigningKey(key())
						.build()
						.parse(token);
			return true;
		} catch (MalformedJwtException ex) {
				throw new PokedexException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
		} catch (ExpiredJwtException ex) {
				throw new PokedexException(HttpStatus.BAD_REQUEST, "Expired JWT token");
		} catch (UnsupportedJwtException ex) {
				throw new PokedexException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
		} catch (IllegalArgumentException ex) {
				throw new PokedexException(HttpStatus.BAD_REQUEST, "JWT claims string is empty.");
		}
	}
}
