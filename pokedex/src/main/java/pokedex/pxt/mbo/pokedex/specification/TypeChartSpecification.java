package pokedex.pxt.mbo.pokedex.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public class TypeChartSpecification<TypeChart> {

	/**
	 * 対応するPokemonのWeaknessesを抽出
	 * 
	 * @return Specification<Pokemon>
	 */
	public Specification<TypeChart> getTypeChart(List<Integer> typeList) {
			switch (typeList.size()) {
				case 1: {
					return (typeEqualTo("1", typeList.get(0))).and(typeEqualTo("2", null));
				}
				case 2: {
					return (typeEqualTo("1", typeList.get(0))).and(typeEqualTo("2", typeList.get(1)));
				}
				default:
					return null;
			}
	}

	public Specification<TypeChart> typeEqualTo(String type, Integer typeId) {
		return (root, query, builder) -> {
			return builder.equal(root.get("type" + type), typeId);
		};
	}
}
