package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Evolution;
import pokedex.pxt.mbo.pokedex.entity.pokemon.EvolutionPkey;

public interface EvolutionRepository extends JpaRepository<Evolution, EvolutionPkey>, JpaSpecificationExecutor<Evolution>{
	
}
