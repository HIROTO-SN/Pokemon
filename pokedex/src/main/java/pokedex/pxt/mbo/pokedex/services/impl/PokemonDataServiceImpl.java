package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.entity.pokemon.TypeChart;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.TypesDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.AttributeDetails;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.AttributeDetails.Abilities;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.AttributeDetails.AttLeft;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.AttributeDetails.AttRight;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.DetailsDblVal;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.DetailsIntVal;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.DetailsStrVal;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsDto;
import pokedex.pxt.mbo.pokedex.repository.PokemonRepository;
import pokedex.pxt.mbo.pokedex.repository.TypeChartRepository;
import pokedex.pxt.mbo.pokedex.repository.TypesRepository;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;
import pokedex.pxt.mbo.pokedex.specification.PokemonSpecification;
import pokedex.pxt.mbo.pokedex.specification.TypeChartSpecification;

@Service
public class PokemonDataServiceImpl implements PokemonDataService {

	@Autowired
	private PokemonRepository pokemonRepository;

	@Autowired
	private TypeChartRepository typeChartRepository;

	@Autowired
	private TypesRepository typesRepository;

	private PokemonSpecification<Pokemon> spec;
	private TypeChartSpecification<TypeChart> spec_weak;

	public PokemonDataServiceImpl() {
		this.spec = new PokemonSpecification<Pokemon>();
		this.spec_weak = new TypeChartSpecification<TypeChart>();
	}

	/**
	 * Pokemonリストを取得
	 * 
	 * @param request <searchDto> リクエスト
	 * @return PokemonDtoオブジェクト
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
	 * Pokemon詳細を取得
	 * 
	 * @param request <int> PokemonId
	 * @return PokemonDetailsDtoオブジェクト
	 */
	public List<PokemonDetailsDto> getPokemonDetails(int pokemonId) {
		List<PokemonDetailsDto> pokemonDetailsDto = new ArrayList<PokemonDetailsDto>();
		pokemonRepository.findByPokemonId(pokemonId)
				.ifPresent(poke -> {
					poke.forEach(_poke -> {
						pokemonDetailsDto.add(setPokemonDetailsDto(_poke));
					});
				});

		return pokemonDetailsDto;
	}

	/**
	 * 前後のPOKEMONデータ取得
	 * 
	 * @param request <int> PokemonId
	 * @return PokemonDetailsDtoオブジェクト
	 */
	public List<PokemonDto> getPokemonPrevNextData(int pokemonId) {
		List<PokemonDto> pokemonDto = new ArrayList<PokemonDto>();
		Integer prevId = (pokemonId - 1) < 1 ? Constants.POKE.get("LAST_POKEMON_ID") : (pokemonId - 1);
		Integer nextId = (pokemonId + 1) > Constants.POKE.get("LAST_POKEMON_ID") ? Constants.POKE.get("LAST_POKEMON_ID")
				: (pokemonId + 1);
		List<Integer> pokeIds = new ArrayList<>(Arrays.asList(prevId, nextId));

		pokemonRepository.findAll(
				Specification
						.where(spec.formIdEquals(1))
						.and(spec.pokeIdIn(pokeIds)))
				.forEach(poke -> {
					pokemonDto.add(setPokemonDtoList(poke));
				});

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
				new ArrayList<TypesDto>(
						pokemon.getType2() == null ? Arrays.asList(
								new TypesDto(pokemon.getType1().getTypeId(), pokemon.getType1().getName()))
								: Arrays.asList(
										new TypesDto(pokemon.getType1().getTypeId(), pokemon.getType1().getName()),
										new TypesDto(pokemon.getType2().getTypeId(), pokemon.getType2().getName()))));
	}

	/**
	 * Pokemon詳細をSET
	 * 
	 * @param pokemon <Pokemon> Pokemonエンティティオブジェクト
	 * @return PokemonDetailsDtoオブジェクト
	 */
	private PokemonDetailsDto setPokemonDetailsDto(Pokemon pokemon) {

		String src = String.format("%04d", pokemon.getPokemonId());
		src = "../pokemon/" + src + ".png";

		return new PokemonDetailsDto(
				pokemon.getFormId(),
				pokemon.getPokemonName(),
				src,
				new ArrayList<DetailsStrVal>(
						Arrays.asList(
								new DetailsStrVal("x", pokemon.getV1_description()),
								new DetailsStrVal("y", pokemon.getV2_description()))),
				new ArrayList<DetailsIntVal>(
						Arrays.asList(
								new DetailsIntVal("HP", pokemon.getHp()),
								new DetailsIntVal("Attack", pokemon.getAttack()),
								new DetailsIntVal("Defense", pokemon.getDefense()),
								new DetailsIntVal("Special Attack", pokemon.getSpecialAttack()),
								new DetailsIntVal("Special Defense", pokemon.getSpecialDefense()),
								new DetailsIntVal("Speed", pokemon.getSpeed()))),
				new AttributeDetails(
						new AttLeft(
								new DetailsDblVal("Height", pokemon.getHeight()),
								new DetailsDblVal("Weight", pokemon.getWeight()),
								new DetailsIntVal("Gender", pokemon.getGender())),
						new AttRight(
								new DetailsStrVal("Category", pokemon.getCategory()),
								new Abilities(
										"Abilities",
										new ArrayList<DetailsStrVal>(
												pokemon.getAbility2() == null ? Arrays.asList(
														new DetailsStrVal(pokemon.getAbility1().getName(), pokemon.getAbility1().getDescription()))
														: Arrays.asList(
																new DetailsStrVal(pokemon.getAbility1().getName(),
																		pokemon.getAbility1().getDescription()),
																new DetailsStrVal(pokemon.getAbility2().getName(),
																		pokemon.getAbility2().getDescription()))))),
						new ArrayList<TypesDto>(
								pokemon.getType2() == null ? Arrays.asList(
										new TypesDto(pokemon.getType1().getTypeId(), pokemon.getType1().getName()))
										: Arrays.asList(
												new TypesDto(pokemon.getType1().getTypeId(), pokemon.getType1().getName()),
												new TypesDto(pokemon.getType2().getTypeId(), pokemon.getType2().getName()))),
						getWeakList(pokemon)));
	}

	/**
	 * PokemonのWeaknessesリストを取得
	 * 
	 * @return <TypesDto> TypesDtoオブジェクト(Weakenessesリスト)
	 */
	private List<TypesDto> getWeakList(Pokemon pokemon) {

		TypeChart tc;
		tc = typeChartRepository.findByType1AndType2(pokemon.getType1().getTypeId(), pokemon.getType2().getTypeId());

		List<TypesDto> weakDtoList = new ArrayList<TypesDto>();
		if (tc.effective1Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective1Id, typesRepository.findByTypeId(tc.effective1Id).getName()));
		}
		if (tc.effective2Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective2Id, typesRepository.findByTypeId(tc.effective2Id).getName()));
		}
		if (tc.effective3Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective3Id, typesRepository.findByTypeId(tc.effective3Id).getName()));
		}
		if (tc.effective4Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective4Id, typesRepository.findByTypeId(tc.effective4Id).getName()));
		}
		if (tc.effective5Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective5Id, typesRepository.findByTypeId(tc.effective5Id).getName()));
		}
		if (tc.effective6Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective6Id, typesRepository.findByTypeId(tc.effective6Id).getName()));
		}
		if (tc.effective7Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective7Id, typesRepository.findByTypeId(tc.effective7Id).getName()));
		}
		if (tc.effective8Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective8Id, typesRepository.findByTypeId(tc.effective8Id).getName()));
		}
		if (tc.effective9Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective9Id, typesRepository.findByTypeId(tc.effective9Id).getName()));
		}
		if (tc.effective10Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective10Id, typesRepository.findByTypeId(tc.effective10Id).getName()));
		}
		if (tc.effective11Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective11Id, typesRepository.findByTypeId(tc.effective11Id).getName()));
		}
		if (tc.effective12Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective12Id, typesRepository.findByTypeId(tc.effective12Id).getName()));
		}
		if (tc.effective13Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective13Id, typesRepository.findByTypeId(tc.effective13Id).getName()));
		}
		if (tc.effective14Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective14Id, typesRepository.findByTypeId(tc.effective14Id).getName()));
		}
		if (tc.effective15Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective15Id, typesRepository.findByTypeId(tc.effective15Id).getName()));
		}
		if (tc.effective16Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective16Id, typesRepository.findByTypeId(tc.effective16Id).getName()));
		}
		if (tc.effective17Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective17Id, typesRepository.findByTypeId(tc.effective17Id).getName()));
		}
		if (tc.effective18Point >= 2) {
			weakDtoList.add(new TypesDto(tc.effective18Id, typesRepository.findByTypeId(tc.effective18Id).getName()));
		}

		return weakDtoList;
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
