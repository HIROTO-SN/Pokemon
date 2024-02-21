package pokedex.pxt.mbo.pokedex.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.entity.pokemon.PokemonPkey;

public interface PokemonRepository extends JpaRepository<Pokemon, PokemonPkey>{
	/*
	 * Pokemon一覧用リストを取得する(pokemonIdの範囲指定、pokemonIdの昇順)
	 */
	public Optional<List<Pokemon>> findByFormIdAndPokemonIdBetweenOrderByPokemonId(int formId, int min, int max);
	
	/*
	 * Pokemon一覧用リストを検索する(pokemonIdの範囲指定、pokemonIdの降順)
	 */
	public Optional<List<Pokemon>> findByFormIdAndPokemonIdBetweenOrderByPokemonIdDesc(int formId, int min, int max);

	/*
	 * Pokemon一覧用リストを名前検索する
	 */
	public Optional<List<Pokemon>> findByPokemonNameContainingAndFormId(String pokemoName, int formId);
}
