package pokedex.pxt.mbo.pokedex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.entity.pokemon.PokemonPkey;

public interface PokemonRepository extends JpaRepository<Pokemon, PokemonPkey>, JpaSpecificationExecutor<Pokemon>{
	/*
	 * Pokemon一覧用リストを取得する(主に初期表示時用)
	 */
	public Optional<List<Pokemon>> findByFormIdAndPokemonIdBetweenOrderByPokemonId(int formId, int min, int max);
	
}
