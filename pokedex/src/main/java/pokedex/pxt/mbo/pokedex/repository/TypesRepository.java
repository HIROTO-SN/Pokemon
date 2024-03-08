package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Types;

public interface TypesRepository extends JpaRepository <Types, Integer>{
	
}
