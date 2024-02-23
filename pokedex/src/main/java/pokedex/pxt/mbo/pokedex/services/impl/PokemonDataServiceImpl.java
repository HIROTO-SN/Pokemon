package pokedex.pxt.mbo.pokedex.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.aspectj.apache.bcel.classfile.ConstantString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.payload.pokemon.PokemonDto;
import pokedex.pxt.mbo.pokedex.payload.pokemon.SearchDto;
import pokedex.pxt.mbo.pokedex.repository.PokemonRepository;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService;
import pokedex.pxt.mbo.pokedex.specification.PokemonSpecification;

@Service
public class PokemonDataServiceImpl implements PokemonDataService {

	@Autowired
	private PokemonRepository pokemonRepository;

	// public List<PokemonDto> getAllPokemonList() {
	// 	List<PokemonDto> pokemonDto = new ArrayList<PokemonDto>();
	// 	pokemonRepository.findByFormIdAndPokemonIdBetweenOrderByPokemonId(1, 1, 20)
	// 		.ifPresent(poke -> {
	// 			poke.forEach(_poke -> {
	// 				PokemonDto _pokemonDto = new PokemonDto(
	// 					_poke.getPokemonId(),
	// 					_poke.getFormId(),
	// 					_poke.getPokemonName()
	// 				);
	// 				pokemonDto.add(_pokemonDto);
	// 		});
	// 	});
		
	// 	return pokemonDto;
	// }
	// public List<PokemonDto> getSearchedPokemonList(SearchDto searchDto) {
	// 	List<PokemonDto> pokemonDto = new ArrayList<PokemonDto>();
	// 	// Pokemonリストを検索する（一覧は常にformId=1のものを取得）
	// 	pokemonRepository.findByPokemonNameContainingAndFormId(searchDto.getSearchInput(), 1)
	// 		.ifPresent(poke -> {
	// 			poke.forEach(_poke -> {
	// 				PokemonDto _pokemonDto = new PokemonDto();
	// 				_pokemonDto.setPokemonId(_poke.getPokemonId());
	// 				_pokemonDto.setFormId(_poke.getFormId());
	// 				_pokemonDto.setPokemonName(_poke.getPokemonName());
	// 				pokemonDto.add(_pokemonDto);
	// 			});
	// 		});
	// 	return pokemonDto;
	// }
	// private RestTemplate restTemplate = new RestTemplate();
	// @Autowired
	// private SessionService sessionService;
	
	// public PokemonDto getSearchPokeData(SearchDto searchDto) {
		// 	Pokemon pokemon = sessionService.getPokeDataList().getBody();
		// 	if (searchDto.getSearchInput() != "") {
			// 		List<String> pokemon.getResults().Map()
	// 	} else {
		// 		return pokemon;
		// 	}
		// 	return null;
		// }

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
			pokemon.getPokemonName()
		);
	}
}
