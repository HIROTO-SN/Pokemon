package pokedex.pxt.mbo.pokedex.specification;

import java.util.List;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.JoinType;
import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;

public class EvolutionSpecification<Evolution> {

	/**
	 * pokemonIdに紐づく進化リストを取得
	 * 
	 * @param type Integer pokemonId
	 * @return Specification<Evolution>
	 */
	public Specification<Evolution> findEvolutionByPokemonId(Integer type, String no) {
		return type == null ? null : (root, query, builder) -> {
			return builder
					.equal(root.join("type" + no, JoinType.LEFT)
							.get("typeId"), type.intValue());
		};
	}
}
