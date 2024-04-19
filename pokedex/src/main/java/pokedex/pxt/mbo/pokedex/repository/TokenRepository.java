package pokedex.pxt.mbo.pokedex.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Long> {
	/*
	 * トークンで検索
	 */
	public Optional<Token> findByToken(String token);
}
