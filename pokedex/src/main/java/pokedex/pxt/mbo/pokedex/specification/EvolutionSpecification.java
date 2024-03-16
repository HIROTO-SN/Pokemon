package pokedex.pxt.mbo.pokedex.specification;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;

public class EvolutionSpecification<Evolution> {

	/**
	 * pokemonIdに紐づく進化リストを取得
	 * 
	 * @param type Integer pokemonId
	 * @return Specification<Evolution>
	 */
	public Specification<Evolution> pokemonIdEquals(int pokemonId) {
		return (root, query, builder) -> {
			Join<Pokemon, Evolution> pokemonJoin = root.join("pokemonId", JoinType.LEFT);
			query.distinct(true);
			return builder
					.equal(pokemonJoin.get("pokemonId"), pokemonId);
		};
	}
}
