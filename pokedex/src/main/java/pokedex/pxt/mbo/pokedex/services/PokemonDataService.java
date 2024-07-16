package pokedex.pxt.mbo.pokedex.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.Pagination;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsInfoDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.pokeList.PokemonDto;

@Service
public interface PokemonDataService {
	public PokemonDto getPokemonList(SearchDto searchDto);

	public PokemonDetailsInfoDto getPokemonDetails(String pokemonName);

	public List<Pagination> getPokemonPrevNextData(String pokemonName);

	/**
	 * Weakリスト作成用のタイプペアオブジェ
	 */
	@AllArgsConstructor
	@NoArgsConstructor
	public static class TypePair {
		public Integer type_1;
		public Integer type_2;
	}

}
