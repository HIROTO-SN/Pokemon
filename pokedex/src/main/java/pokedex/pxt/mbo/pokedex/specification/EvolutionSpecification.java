package pokedex.pxt.mbo.pokedex.specification;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;

public class EvolutionSpecification<Evolution> {

	/**
	 * pokemonIdの属するGroupを全て（全ての進化種）を取得
	 * 
	 * @param type Integer pokemonId
	 * @return Specification<Evolution>
	 */
	// public Specification<Evolution> findGroupByPokemonId(int pokemonId) {
	// 	return (root, query, builder) -> {
	// 		Subquery<Integer> subquery = query.subquery(Integer.class);
	// 		Root<Pokemon> evolutionRoot = subquery.from(Pokemon.class);
	// 		Join<Evolution, Pokemon> pokemonJoin = evolutionRoot.join("pokemon", JoinType.LEFT);
	// 		query.distinct(true);
	// 		subquery.select(builder.evolutionRoot.get("groupdId"))
	// 			.where(builder.equal(pokemonJoin.get("pokemonId"), pokemonId));

	// 		return root.get("groupId").in(subquery);
	// 	};
	// }

	/**
	 * pokemonIdに紐づく進化種情報を取得
	 * 
	 * @param type Integer pokemonId
	 * @return Specification<Evolution>
	 */
	public Specification<Evolution> pokemonIdEquals(int pokemonId) {
		return (root, query, builder) -> {
			Join<Pokemon, Evolution> pokemonJoin = root.join("pokemon", JoinType.LEFT);
			query.distinct(true);
			return builder
					.equal(pokemonJoin.get("pokemonId"), pokemonId);
		};
	}
}
