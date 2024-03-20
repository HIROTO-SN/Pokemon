package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Evolution;
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
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.EvolutionDetails;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetails;
import pokedex.pxt.mbo.pokedex.payload.pokemon.details.PokemonDetailsInfoDto;
import pokedex.pxt.mbo.pokedex.repository.EvolutionRepository;
import pokedex.pxt.mbo.pokedex.repository.PokemonRepository;
import pokedex.pxt.mbo.pokedex.repository.TypeChartRepository;
import pokedex.pxt.mbo.pokedex.repository.TypesRepository;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;
import pokedex.pxt.mbo.pokedex.specification.EvolutionSpecification;
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

	@Autowired
	private EvolutionRepository evolutionRepository;

	private PokemonSpecification<Pokemon> spec;
	private TypeChartSpecification<TypeChart> spec_weak;
	private EvolutionSpecification<Evolution> spec_evol;

	public PokemonDataServiceImpl() {
		this.spec = new PokemonSpecification<Pokemon>();
		this.spec_weak = new TypeChartSpecification<TypeChart>();
		this.spec_evol = new EvolutionSpecification<Evolution>();
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
								pokemonDto.add(setPokemonDto(_poke));
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
							pokemonDto.add(setPokemonDto(poke));
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
							pokemonDto.add(setPokemonDto(poke));
						});
				break;
			}
		}
		return pokemonDto;
	}

	/**
	 * Pokemon個々の詳細情報を取得
	 * 
	 * @param request <int> PokemonId
	 * @return PokemonDetailsDtoオブジェクト
	 */
	public PokemonDetailsInfoDto getPokemonDetails(int pokemonId) {
		PokemonDetailsInfoDto pokemonDetailsInfo = new PokemonDetailsInfoDto();

		// Pokemon詳細を取得
		List<PokemonDetails> pokemonDetailsDto = new ArrayList<PokemonDetails>();
		// Dtoオブジェクトに成形
		pokemonRepository.findByPokemonId(pokemonId)
				.ifPresent(poke -> {
					poke.forEach(_poke -> {
						pokemonDetailsDto.add(setPokemonDetailsDto(_poke));
					});
				});

		// Pokemon進化情報を取得
		List<EvolutionDetails> evolutionDetails = new ArrayList<EvolutionDetails>();
		// Pokemonが属する進化グループを取得
		String groupId = evolutionRepository.findFirstByPokemonId(pokemonId).getGroupId();

		// 進化系リストを取得し、Dtoオブジェクトに成形
		Optional<List<Evolution>> evolutions = evolutionRepository
				.findByGroupIdOrderByStageAscPokemonIdAscFormIdAsc(groupId);
		if (evolutions.isPresent()) {
			for (Evolution evol : evolutions.get()) {
				evolutionDetails.add(loopEvolutionNexts(evol, evolutions));
			}
		}

		pokemonDetailsInfo.setPokemonDetails(pokemonDetailsDto);
		pokemonDetailsInfo.setEvolutionDetails(evolutionDetails);

		return pokemonDetailsInfo;
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
					pokemonDto.add(setPokemonDto(poke));
				});

		return pokemonDto;
	}

	/**
	 * PokemonリストをSET
	 * 
	 * @param pokemon <Pokemon> Pokemonエンティティオブジェクト
	 * @return <PokemonDto> PokemonDtoオブジェクト
	 */
	private PokemonDto setPokemonDto(Pokemon poke) {

		PokemonDto dto = new PokemonDto();
		dto.setPokemonId(poke.getPokemonId());
		dto.setFormId(poke.getFormId());
		dto.setPokemonName(poke.getPokemonName());
		// タイプを取得しセット
		List<TypesDto> typeList = new ArrayList<>();
		typeList.add(new TypesDto(poke.getType1().getTypeId(), poke.getType1().getName()));
		if (poke.getType2() != null) {
			typeList.add(new TypesDto(poke.getType2().getTypeId(), poke.getType2().getName()));
		}
		dto.setTypes(typeList);

		return dto;
	}

	/**
	 * Pokemon詳細をSET
	 * 
	 * @param poke <Pokemon> Pokemonエンティティオブジェクト
	 * @return PokemonDetailsDtoオブジェクト
	 */
	private PokemonDetails setPokemonDetailsDto(Pokemon poke) {

		String src = String.format("%04d", poke.getPokemonId());
		// イメージソース先を定義
		if (poke.getFormId() == 1) {
			src = "../pokemon/" + src + ".png";
		} else {
			src = "../pokemon/" + src + "_f" + poke.getFormId() + ".png";
		}

		PokemonDetails dto = new PokemonDetails();
		// FormId
		dto.setId(poke.getFormId());
		// Pokemon名
		dto.setName(poke.getPokemonName());
		// イメージソース先
		dto.setSrc(src);
		// バージョン情報
		dto.setVersions(new ArrayList<DetailsStrVal>(
				Arrays.asList(
						new DetailsStrVal("x", poke.getV1_description()),
						new DetailsStrVal("y", poke.getV2_description()))));
		// ステータス（HP・Attack・Defenseなど）
		dto.setStatList(new ArrayList<DetailsIntVal>(
				Arrays.asList(
						new DetailsIntVal("HP", poke.getHp()),
						new DetailsIntVal("Attack", poke.getAttack()),
						new DetailsIntVal("Defense", poke.getDefense()),
						new DetailsIntVal("Special Attack", poke.getSpecialAttack()),
						new DetailsIntVal("Special Defense", poke.getSpecialDefense()),
						new DetailsIntVal("Speed", poke.getSpeed()))));

		// Attribute情報（性質・アビリティ・大きさなど）
		AttributeDetails attributes = new AttributeDetails();

		// Attribute 画面左側（Height, Weight, Gender）
		AttLeft attLeft = new AttLeft(
				new DetailsDblVal("Height", poke.getHeight()),
				new DetailsDblVal("Weight", poke.getWeight()),
				new DetailsIntVal("Gender", poke.getGender()));
		// Abilitiesを取得
		Abilities abilities = new Abilities();
		abilities.setName("Abilities");
		List<DetailsStrVal> abilityList = new ArrayList<>();
		abilityList.add(new DetailsStrVal(poke.getAbility1().getName(), poke.getAbility1().getDescription()));
		if (poke.getAbility2() != null) {
			abilityList.add(new DetailsStrVal(poke.getAbility2().getName(), poke.getAbility2().getDescription()));
		}
		abilities.setVal(abilityList);
		// Attribute 画面右側（Category, Abilities）
		AttRight attRight = new AttRight();
		attRight.setCategory(new DetailsStrVal("Category", poke.getCategory()));
		attRight.setAbilities(abilities);
		// タイプを取得
		List<TypesDto> typesDto = new ArrayList<>();
		typesDto.add(new TypesDto(poke.getType1().getTypeId(), poke.getType1().getName()));
		if (poke.getType2() != null) {
			typesDto.add(new TypesDto(poke.getType2().getTypeId(), poke.getType2().getName()));
		}
		attributes.setAtt_left(attLeft);
		attributes.setAtt_right(attRight);
		attributes.setTypes(typesDto);
		attributes.setWeaks(getWeakList(poke));

		dto.setAttribute(attributes);

		return dto;
	}

	/**
	 * 各Pokemonの進化ツリー情報をSET
	 * 
	 * @param evol        <Evolution> Evolutionエンティティオブジェクト（対象進化系）
	 * @param evolListAll <Optional<List<Evolution>>> DBから取得した進化リスト全て
	 * @return <EvolutionDetails> 成形した進化リスト（EvolutionDetailsオブジェクト）
	 */
	private EvolutionDetails loopEvolutionNexts(Evolution evol, Optional<List<Evolution>> evolListAll) {
		// 進化系が存在しない場合
		if (evol.getNextPokemonId() == null) {
			return setEvolutionDetailsDto(evol, null);
			// 次の進化系が存在する場合
		} else {
			Optional<List<Evolution>> next_evolutions = evolListAll.map(list -> list.stream()
					.filter(e -> e.getPokemonId() == Integer.parseInt(evol.getNextPokemonId()))
					.collect(Collectors.toList()));

			List<EvolutionDetails> next_evolution_detail = new ArrayList<EvolutionDetails>();
			next_evolutions.ifPresent(next_evol_list -> {
				next_evol_list.forEach(_evol -> {
					next_evolution_detail.add(loopEvolutionNexts(_evol, evolListAll));
				});
			});

			return setEvolutionDetailsDto(evol, next_evolution_detail);
		}
	}

	/**
	 * EvolutionDetailsをSET
	 * 
	 * @param Evolution      <Evolution> Evolutionエンティティオブジェクト
	 * @param evol_next_list <List<EvolutionDetails>>
	 *                       セットするPokemonの進化系詳細Evolutionリスト
	 * @return <EvolutionDetails> EvolutionDetailsオブジェクト
	 */
	private EvolutionDetails setEvolutionDetailsDto(Evolution evol, List<EvolutionDetails> evol_next_list) {
		EvolutionDetails evolutionDetails = new EvolutionDetails();
		evolutionDetails.setStage(Integer.parseInt(evol.getStage()));
		evolutionDetails.setFormId(evol.getFormId());
		evolutionDetails.setPokemonId(evol.getPokemonId());
		evolutionDetails.setPokemonName(evol.getPokemon().getPokemonName());

		String src = String.format("%04d", evol.getPokemonId());
		// イメージソース先を定義
		if (evol.getFormId() == 1) {
			src = "../pokemon/" + src + ".png";
		} else {
			src = "../pokemon/" + src + "_f" + evol.getFormId() + ".png";
		}
		evolutionDetails.setSrc(src);

		// タイプを取得
		List<TypesDto> typesDto = new ArrayList<>();
		Pokemon poke = evol.getPokemon();
		typesDto.add(new TypesDto(poke.getType1().getTypeId(), poke.getType1().getName()));
		if (poke.getType2() != null) {
			typesDto.add(new TypesDto(poke.getType2().getTypeId(), poke.getType2().getName()));
		}
		evolutionDetails.setTypes(typesDto);

		// 進化系をセット
		evolutionDetails.setNext(evol_next_list);

		return evolutionDetails;
	}

	/**
	 * PokemonのWeaknessesリストを取得
	 * 
	 * @return <TypesDto> TypesDtoオブジェクト(Weakenessesリスト)
	 */
	private List<TypesDto> getWeakList(Pokemon pokemon) {

		TypeChart tc;
		if (pokemon.getType2() == null) {
			tc = typeChartRepository.findByType1AndType2(pokemon.getType1().getTypeId(), null);
		} else {
			tc = typeChartRepository.findByType1AndType2(pokemon.getType1().getTypeId(), pokemon.getType2().getTypeId());
		}

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
