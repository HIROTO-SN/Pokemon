package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.Token;

public interface TokenRepository extends JpaRepository<Token, Long>{
	
}
