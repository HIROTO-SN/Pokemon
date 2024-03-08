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
import pokedex.pxt.mbo.pokedex.entity.pokemon.Weaknesses;
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
import pokedex.pxt.mbo.pokedex.repository.WeaknessRepository;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;
import pokedex.pxt.mbo.pokedex.specification.PokemonSpecification;
import pokedex.pxt.mbo.pokedex.specification.WeaknessSpecification;

@Service
public class PokemonDataServiceImpl implements PokemonDataService {

	@Autowired
	private PokemonRepository pokemonRepository;

	@Autowired
	private WeaknessRepository weaknessRepository;

	private PokemonSpecification<Pokemon> spec;
	private WeaknessSpecification<Weaknesses> spec_weak;

	public PokemonDataServiceImpl() {
		this.spec = new PokemonSpecification<Pokemon>();
		this.spec_weak = new WeaknessSpecification<Weaknesses>();
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
				List<Weaknesses> weaknesses = weaknessRepository.findAll();

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
		Integer nextId = (pokemonId + 1) > Constants.POKE.get("LAST_POKEMON_ID") ? Constants.POKE.get("LAST_POKEMON_ID") : (pokemonId + 1);
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
								new TypesDto(pokemon.getType1().getType_id(), pokemon.getType1().getName()))
								: Arrays.asList(
										new TypesDto(pokemon.getType1().getType_id(), pokemon.getType1().getName()),
										new TypesDto(pokemon.getType2().getType_id(), pokemon.getType2().getName()))));
	}

	/**
	 * Pokemon詳細をSET
	 * 
	 * @param pokemon <Pokemon> Pokemonエンティティオブジェクト
	 * @return PokemonDetailsDtoオブジェクト
	 */
	private PokemonDetailsDto setPokemonDetailsDto(Pokemon pokemon) {

		String src= String.format("%04d", pokemon.getPokemonId());
		src = "../pokemon/" + src + ".png";
		
		List<Integer> typeList = new ArrayList<Integer>();
		typeList.add(pokemon.getType1().getType_id());
		if (pokemon.getType2() != null) {
			typeList.add(pokemon.getType2().getType_id());
		}
		List<Weaknesses> weaknesses = weaknessRepository.findAll(
			Specification.where(spec_weak.getWeaknesses(typeList))
		);

		List<String> weakDtoList = new ArrayList<String>();
		weaknesses.forEach(w -> {
			if (w.getBug() >= 2 ) {
				weakDtoList.add("bug");
			} else if (w.getDark() >= 2) {
				weakDtoList.add("dark");
			} else if (w.getDragon() >= 2) {
				weakDtoList.add("dragon");
			} else if (w.getElectric() >= 2) {
				weakDtoList.add("electric");
			} else if (w.getFairy() >= 2) {
				weakDtoList.add("fairy");
			} else if (w.getFighting() >= 2) {
				weakDtoList.add("fighting");
			} else if (w.getFire() >= 2) {
				weakDtoList.add("fire");
			} else if (w.getFlying() >= 2) {
				weakDtoList.add("flying");
			} else if (w.getGhost() >= 2) {
				weakDtoList.add("ghost");
			} else if (w.getGrass() >= 2) {
				weakDtoList.add("grass");
			} else if (w.getGround() >= 2) {
				weakDtoList.add("ground");
			} else if (w.getDragon() >= 2) {
				weakDtoList.add("dragon");
			} else if (w.getIce() >= 2) {
				weakDtoList.add("ice");
			} else if (w.getNormal() >= 2) {
				weakDtoList.add("normal");
			} else if (w.getPoison() >= 2) {
				weakDtoList.add("poison");
			} else if (w.getPsychic() >= 2) {
				weakDtoList.add("psychic");
			} else if (w.getRock() >= 2) {
				weakDtoList.add("rock");
			} else if (w.getSteel() >= 2) {
				weakDtoList.add("steel");
			} else if (w.getWater() >= 2) {
				weakDtoList.add("water");
			}
		});

		
		return new PokemonDetailsDto(
				pokemon.getFormId(),
				pokemon.getPokemonName(),
				src,
				new ArrayList<DetailsStrVal>(
					Arrays.asList(
						new DetailsStrVal("x", pokemon.getV1_description()),
						new DetailsStrVal("y", pokemon.getV2_description())
					)
				),
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
										new TypesDto(pokemon.getType1().getType_id(), pokemon.getType1().getName()))
										: Arrays.asList(
												new TypesDto(pokemon.getType1().getType_id(), pokemon.getType1().getName()),
												new TypesDto(pokemon.getType2().getType_id(), pokemon.getType2().getName()))),
												new ArrayList<TypesDto>(
													pokemon.getType2() == null ? Arrays.asList(
															new TypesDto(pokemon.getType1().getType_id(), pokemon.getType1().getName()))
															: Arrays.asList(
																	new TypesDto(2, "fire"),
																	new TypesDto(6, "ice"),
																	new TypesDto(10, "flying"),
																	new TypesDto(11, "psychic")
																	))
					));
	}

	/**
	 * Pokemonリストをソート
	 * 
	 * @param sortBy <String> sort内容
	 * @return <Direction> Directionオブジェクト
	 */
	// private TypesDto setWeakDtoList(List<Weaknesses> list) {
	// 	TypesDto types = new TypesDto();
		
	// }

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
