package pokedex.pxt.mbo.pokedex.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public class WeaknessSpecification<Weaknesses> {

	/**
	 * 対応するPokemonのWeaknessesを抽出
	 * 
	 * @return Specification<Pokemon>
	 */
	public Specification<Weaknesses> getWeaknesses(List<Integer> typeList) {
			switch (typeList.size()) {
				case 1: {
					return (weakEqualTo("1", typeList.get(0))).and(weakEqualTo("2", null));
				}
				case 2: {
					return (weakEqualTo("1", typeList.get(0))).and(weakEqualTo("2", typeList.get(1)));
				}
				default:
					return null;
			}
	}

	public Specification<Weaknesses> weakEqualTo(String type, Integer typeId) {
		return (root, query, builder) -> {
			return builder.equal(root.get("type" + type), typeId);
		};
	}

	/**
	 * Weaknessesで検索
	 * 
	 * @return Specification<Pokemon>
	 */
	public Specification<Weaknesses> weaknessesIn(List<Integer> weakId) {
		return (root, query, builder) -> {
			return weakId.size() == 0 ? null : 
				root.get("pokemonId").in(weakId);
		};
	}
}
