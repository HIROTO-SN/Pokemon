package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.Types;
import pokedex.pxt.mbo.pokedex.repository.PokemonRepository;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;
import pokedex.pxt.mbo.pokedex.specification.PokemonSpecification;

@Service
public class PokemonDataServiceImpl implements PokemonDataService {

	@Autowired
	private PokemonRepository pokemonRepository;

	/**
	 * Pokemonリストを取得
	 * @param request <searchDto> リクエスト
	 * @return response <PokemonDto> 
	 */
	public List<PokemonDto> getPokemonList(SearchDto searchDto) {
		List<PokemonDto> pokemonDto = new ArrayList<PokemonDto>();
		// 初回表示時
		if (searchDto.getInitFlg()) {
			// Pokemonリストを検索する（一覧は常にformId=1のものを取得）
			pokemonRepository.findByFormIdAndPokemonIdBetweenOrderByPokemonId(
				Constants.POKE.get("FORM_ID_FOR_LIST"),
				Constants.POKE.get("OFFSET_FOR_INIT"),
				Constants.POKE.get("PAGE_SIZE")
				)
				.ifPresent(poke -> {
					poke.forEach(_poke -> {
						pokemonDto.add(setPokemonDtoList(_poke));
					});
				});
		// 初回以外の検索または「Load more」押下時
		} else {
			PokemonSpecification<Pokemon> spec = new PokemonSpecification<>();
			pokemonRepository.findAll(
				Specification
					.where(spec.formIdOneAndSort(searchDto.getSortBy()))
					.and(spec.nameContains(searchDto.getSearchInput()))
					.and(spec.typeSearch(searchDto.getTypes(), "1", "2")
							.or(spec.typeSearch(searchDto.getTypes(), "2", "1")))
					,PageRequest.of(searchDto.getPageNumber(), Constants.POKE.get("PAGE_SIZE"), Sort.by(
						searchDto.getSortBy().equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, 
						"pokemonId"))
			).forEach(poke -> {
				pokemonDto.add(setPokemonDtoList(poke));
			});
		}
		
		return pokemonDto;
	}

	/**
	 * PokemonリストをSET
	 * @param pokemon <Pokemon> Pokemonエンティティオブジェクト
	 * @return <PokemonDto> PokemonDtoオブジェクト
	 */
	private PokemonDto setPokemonDtoList(Pokemon pokemon) {
		return new PokemonDto(
			pokemon.getPokemonId(),
			pokemon.getFormId(),
			pokemon.getPokemonName(),
			new ArrayList<Types>(
				pokemon.getType2() == null ?
					Arrays.asList(
						new Types(pokemon.getType1().getType_id(), pokemon.getType1().getName())
					)	: 
					Arrays.asList(
						new Types(pokemon.getType1().getType_id(), pokemon.getType1().getName()),
						new Types(pokemon.getType2().getType_id(), pokemon.getType2().getName())
					)
			)
		);
	}
}
