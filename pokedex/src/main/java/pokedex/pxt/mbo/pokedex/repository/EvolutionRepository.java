package pokedex.pxt.mbo.pokedex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Evolution;
import pokedex.pxt.mbo.pokedex.entity.pokemon.EvolutionPkey;

public interface EvolutionRepository extends JpaRepository<Evolution, EvolutionPkey>, JpaSpecificationExecutor<Evolution>{
	/*
	 * 特定のPokemonIdに紐づく進化系を取得
	 */
	public Evolution findByPokemonId(int pokemonId);	

	/*
	 * 1つのグループに紐づく進化系を取得
	 */
	public Optional<List<Evolution>> findByGroupIdOrderByStage(int groupId);	

}
