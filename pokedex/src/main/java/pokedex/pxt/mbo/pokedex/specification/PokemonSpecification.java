package pokedex.pxt.mbo.pokedex.specification;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import pokedex.pxt.mbo.pokedex.common.Constants;

public class PokemonSpecification<Pokemon> {
	/**
	 * Pokemonをソートし、formId=1のものだけ抽出
	 * @param sort <String> ソート種類(asc または desc)
	 * @return <Specification<Pokemon>> 
	 */
	public Specification<Pokemon> formIdOneAndSort(String sort) {
		return new Specification<Pokemon>() {
			@Override
			public Predicate toPredicate(Root<Pokemon> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				switch (sort) {
					case "asc":
						query.orderBy(builder.asc(root.get("pokemonId")));
						break;
					case "desc":
						query.orderBy(builder.desc(root.get("pokemonId")));
					break;
				};
				return builder.equal(root.get("formId"), Constants.POKE.get("FORM_ID_FOR_LIST"));
			}
		};
	}

	/**
	 * Pokemon名による検索
	 * @param pokemonName <String> Pokemon名
	 * @return <Specification<Pokemon>> 
	 */
	public Specification<Pokemon> nameContains(String pokemonName) {
		return pokemonName.equals("") ? null : (root, query, builder) -> {
			return builder.like(root.get("pokemonName"), "%" + pokemonName + "%");
		};
	}
	
	/**
	 * Pokemonの高さによる検索
	 * @param height <String> Pokemonの高さ（インチ） ex.) 5'04 - 5フィート4インチ）
	 * @return <Specification<Pokemon>> 
	 */
	public Specification<Pokemon> heightBetween(String height) {
		return height.equals("") ? null : (root, query, builder) -> {
			switch (height) {
				case "short":
				return builder.lessThan(root.get("height"), Constants.POKE_HEIGHT.get("MIDDLE_MIN"));
				case "middle":
				return builder.between(root.get("height"), Constants.POKE_HEIGHT.get("MIDDLE_MIN"), Constants.POKE_HEIGHT.get("TALL_MIN"));
				case "tall":
				return builder.greaterThan(root.get("height"), Constants.POKE_HEIGHT.get("TALL_MIN"));
			};
			return null;
		};
	}
}
