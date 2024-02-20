package pokedex.pxt.mbo.pokedex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.entity.pokemon.PokemonPkey;

public interface PokemonRepository extends JpaRepository<Pokemon, PokemonPkey>{
	/*
	 * Pokemon一覧用リストを全て取得する（初期表示用の20件）
	 */
	public Optional<List<Pokemon>> findByFormIdAndPokemonIdBetweenOrderByPokemonId(int formId, int min, int max);

	/*
	 * Pokemon一覧用リストを検索する
	 */
	public Optional<List<Pokemon>> findByPokemonNameContainingAndFormId(String pokemoName, int formId);
}
