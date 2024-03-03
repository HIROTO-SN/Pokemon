package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Random;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

	private PokemonSpecification<Pokemon> spec;

	public PokemonDataServiceImpl() {
		this.spec = new PokemonSpecification<Pokemon>();
	}

	/**
	 * Pokemonリストを取得
	 * 
	 * @param request <searchDto> リクエスト
	 * @return response <PokemonDto>
	 */
	public List<PokemonDto> getPokemonList(SearchDto searchDto) {
		List<PokemonDto> pokemonDto = new ArrayList<PokemonDto>();
		// 初回表示時
		switch (searchDto.getActionType()) {
			case "init": {
				// Pokemonリストを検索する（一覧は常にformId=1のものを取得）
				pokemonRepository.findByFormIdAndPokemonIdBetweenOrderByPokemonId(
						Constants.POKE.get("FORM_ID_FOR_LIST"),
						Constants.POKE.get("OFFSET_FOR_INIT"),
						Constants.POKE.get("PAGE_SIZE"))
						.ifPresent(poke -> {
							poke.forEach(_poke -> {
								pokemonDto.add(setPokemonDtoList(_poke));
							});
						});
				break;
			}
			case "search": {
				// 初回以外の検索または'Surprise Me!'ではない時の「Load more」押下時
				pokemonRepository.findAll(
						Specification
								.where(spec.formIdEquals(Constants.POKE.get("FORM_ID_FOR_LIST")))
								.and(spec.idBetween(searchDto.getNumberRangeMin(), searchDto.getNumberRangeMax()))
								.and(spec.nameContains(searchDto.getSearchInput()))
								.and(spec.typeSearch(searchDto.getTypes(), "1", "2"))
								.and(spec.abilitySearch(searchDto.getAbility(), "1", "2"))
								.and(spec.heightWeightSearch(searchDto.getHeightPoint(), "height"))
								.and(spec.heightWeightSearch(searchDto.getWeightPoint(), "weight")),
						PageRequest.of(searchDto.getPageNumber(),
								Constants.POKE.get("PAGE_SIZE"),
								manageSort(searchDto.getSortBy())))
						.forEach(poke -> {
							pokemonDto.add(setPokemonDtoList(poke));
						});
				break;
			}
			case "surprise": {
				List<Integer> idList = new ArrayList<Integer>();
				List<Integer> randomList = new ArrayList<Integer>();
				// 'Surprise Me!'押下時処理
				if (searchDto.getPageNumber() == 0) {
					// 1～1025までの整数値を持つリストを用意し、シャッフル
					for (int i = 1; i <= Constants.POKE.get("LAST_POKEMON_ID"); i++) {
						randomList.add(i);
					}
				}
				// 'Surprise Me!'押下 → Load More押下
				else {
					// 既に表示されているものを除く1～1025までの整数値を持つリストを用意し、シャッフル
					for (int i = 1; i <= Constants.POKE.get("LAST_POKEMON_ID"); i++) {
						if (!searchDto.getPokeIdList().contains(i)) {
							randomList.add(i);
						}
					}
				}
				Collections.shuffle(randomList);
				idList = randomList.subList(0, Constants.POKE.get("PAGE_SIZE"));
				pokemonRepository.findAll(
						Specification
								.where(spec.formIdEquals(Constants.POKE.get("FORM_ID_FOR_LIST")))
								.and(spec.idInclude(idList)))
						.forEach(poke -> {
							pokemonDto.add(setPokemonDtoList(poke));
						});
				break;
			}
		}
		return pokemonDto;
	}

	/**
	 * PokemonリストをSET
	 * 
	 * @param pokemon <Pokemon> Pokemonエンティティオブジェクト
	 * @return <PokemonDto> PokemonDtoオブジェクト
	 */
	private PokemonDto setPokemonDtoList(Pokemon pokemon) {
		return new PokemonDto(
				pokemon.getPokemonId(),
				pokemon.getFormId(),
				pokemon.getPokemonName(),
				new ArrayList<Types>(
						pokemon.getType2() == null ? Arrays.asList(
								new Types(pokemon.getType1().getType_id(), pokemon.getType1().getName()))
								: Arrays.asList(
										new Types(pokemon.getType1().getType_id(), pokemon.getType1().getName()),
										new Types(pokemon.getType2().getType_id(), pokemon.getType2().getName()))),
				new ArrayList<Types>());
	}

	/**
	 * Pokemonリストをソート
	 * 
	 * @param sortBy <String> sort内容
	 * @return <Direction> Directionオブジェクト
	 */
	private Sort manageSort(String sortBy) {
		switch (sortBy) {
			case "asc":
			default:
				return Sort.by(Direction.ASC, "pokemonId");
			case "desc":
				return Sort.by(Direction.DESC, "pokemonId");
			case "A-Z":
				return Sort.by(Direction.ASC, "pokemonName");
			case "Z-A":
				return Sort.by(Direction.DESC, "pokemonName");
		}
	}
}
