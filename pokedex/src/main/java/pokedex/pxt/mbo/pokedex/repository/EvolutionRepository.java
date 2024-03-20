package pokedex.pxt.mbo.pokedex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Evolution;

public interface EvolutionRepository extends JpaRepository<Evolution, Integer>, JpaSpecificationExecutor<Evolution>{
	/*
	 * 特定のPokemonIdに紐づく進化系を取得
	 */
	public Evolution findFirstByPokemonId(int pokemonId);	

	/*
	 * 1つのグループに紐づく進化系を取得
	 */
	public Optional<List<Evolution>> findByGroupIdOrderByStageAscPokemonIdAscFormIdAsc(String groupId);	

}
