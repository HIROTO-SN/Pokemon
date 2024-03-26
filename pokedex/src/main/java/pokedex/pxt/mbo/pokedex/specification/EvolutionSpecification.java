package pokedex.pxt.mbo.pokedex.specification;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;

public class EvolutionSpecification<Evolution> {

	/**
	 * 同じグループ（進化系）に属するポケモン進化系を取得
	 * 
	 * @param groupId int グループID
	 * @return Specification<Evolution>
	 */
	public Specification<Evolution> groupIdEquals(int groupId) {
		return (root, query, builder) -> {
			Join<Evolution,Pokemon> pokemonJoin = root.join("pokemon", JoinType.LEFT);
			
			Predicate groupIdPredicate = builder.equal(root.get("groupId"), groupId);
			query.distinct(true);
			query.where(groupIdPredicate);
			query.orderBy(builder.asc(root.get("stage")));
			return pokemonJoin.get("pokemonId").in(2);
		};
	}

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
