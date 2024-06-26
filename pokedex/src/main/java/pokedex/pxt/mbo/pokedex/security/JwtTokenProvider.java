package pokedex.pxt.mbo.pokedex.security;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import pokedex.pxt.mbo.pokedex.exception.PokedexException;

@Component
public class JwtTokenProvider {

	@Value("${app.jwt.secret}")
	private String jwtSecret;

	@Value("${app.jwt.expiration-milliseconds}")
	private long jwtExpirationDate;

	/*
	* トークンを生成
	*/
	public String generateToken(Authentication authentication) {
		String username = authentication.getName();
		Date currentDate = new Date();
		Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);
		String token = Jwts.builder()
				.subject(username)
				.issuedAt(new Date())
				.expiration(expireDate)
				.signWith(key())
				.compact();
		return token;
	}

	/*
	* 認証アルゴリズム
	*/
	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
	}

	/*
	* ユーザー名を取得
	*/
	public String getUsername(String token) {
		return Jwts.parser()
				.verifyWith((SecretKey) key())
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}
 
	/*
	* トークン認証
	*/
	public boolean validateToken(String token) {
		try {
			Jwts.parser()
					.verifyWith((SecretKey)key())
				.build()
					.parse(token);
		return true;
		} catch (MalformedJwtException e) {
			throw new PokedexException(HttpStatus.BAD_REQUEST, "Invalid JWT token");
 		} catch (ExpiredJwtException e) {
			throw new PokedexException(HttpStatus.BAD_REQUEST, "Expired JWT token");
 		} catch (UnsupportedJwtException e) {
			throw new PokedexException(HttpStatus.BAD_REQUEST, "Unsupported JWT token");
		} catch (IllegalArgumentException e) {
			throw new PokedexException(HttpStatus.BAD_REQUEST, "Jwt claims string is null or empty");
		}
	}
}
