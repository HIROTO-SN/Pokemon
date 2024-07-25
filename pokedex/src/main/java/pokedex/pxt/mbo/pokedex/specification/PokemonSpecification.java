package pokedex.pxt.mbo.pokedex.specification;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import pokedex.pxt.mbo.pokedex.common.Constants;
import pokedex.pxt.mbo.pokedex.services.PokemonDataService.TypePair;

public class PokemonSpecification<Pokemon> {

	/**
	 * PokemonIdで検索
	 * 
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> pokeIdIn(List<Integer> pokeIds) {
		return new Specification<Pokemon>() {
			@Override
			public Predicate toPredicate(Root<Pokemon> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return root.get("pokemonId").in(pokeIds);
			}
		};
	}

	/**
	 * FormIdで検索
	 * 
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> formIdEquals(int formId) {
		return new Specification<Pokemon>() {
			@Override
			public Predicate toPredicate(Root<Pokemon> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
				return builder.equal(root.get("formId"), formId);
			}
		};
	}

	/**
	 * PokemonIdの範囲検索
	 * 
	 * @param min int - Id範囲最小
	 * @param max int - Id範囲最大
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> idBetween(int min, int max) {
		return (root, query, builder) -> {
			return (min == 0 || max == 0) ? builder.lessThan(root.get("pokemonId"), 0)
					: builder.between(root.get("pokemonId"), min, max);
		};
	}

	/**
	 * PokemonIdの指定値を含むもの検索
	 * 
	 * @param type String 高さか重さのどちらの判定かを分岐
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> idInclude(List<Integer> idList) {
		return (root, query, builder) -> {
			return idList.size() == 0 ? null : root.get("pokemonId").in(idList);
		};
	}

	/**
	 * Pokemon名による検索
	 * 
	 * @param pokemonName String Pokemon名
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> nameContains(String pokemonName) {
		return pokemonName.equals("") ? null : (root, query, builder) -> {
			return builder.like(root.get("pokemonName"), "%" + pokemonName + "%");
		};
	}

	/**
	 * タイプによる検索成形用
	 * 
	 * @param types List<Integer> 検索対象タイプIDリスト
	 * @param n1    String type1
	 * @param n2    String type2
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> typeSearch(List<Integer> types, String n1, String n2) {
		switch (types.size()) {
			case 0:
				return null;
			case 1:
				return typeEqual(types.get(0), n1).or(typeEqual(types.get(0), n2));
			case 2:
				return (typeEqual(types.get(0), n1).and(typeEqual(types.get(1), n2))
						.or(typeEqual(types.get(0), n2).and(typeEqual(types.get(1), n1))));
			default:
				// タイプが3件以上選択されている場合は検索結果はなし
				return typeEqual(-1, n1).or(typeEqual(-1, n2));
		}
	}

	/**
	 * タイプによる検索
	 * 
	 * @param typeId Integer タイプID
	 * @param no     String タイプNo
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> typeEqual(Integer typeId, String no) {
		return (root, query, builder) -> {
			return builder.equal(root.get("type" + no).get("typeId"), typeId);
			// .equal(root.join("type" + no, JoinType.LEFT)
			// .get("typeId"), type.intValue());
		};
	}

	/**
	 * 弱点（weaks）による検索成形用
	 * 
	 * @param weaks List<TypePair> 検索対象タイプIDペアリスト
	 * @param n1    String type1
	 * @param n2    String type2
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> weakSearch(List<TypePair> weaks, String n1, String n2) {
		if (weaks == null) {
			return null;
		} else if (weaks.size() == 0) {
			return (root, query, criteriaBuilder) -> criteriaBuilder.disjunction();
		} else {
			Specification<Pokemon> retSpecification = null;
			for (TypePair weak : weaks) {
				Specification<Pokemon> spec = weak.type_2 == null ?
					typeEqual(weak.type_1, n1) :
					typeEqual(weak.type_1, n1).and(typeEqual(weak.type_2, n2)) ;
				if (retSpecification == null) {
					retSpecification = spec;
				} else {
					retSpecification = retSpecification.or(spec);
				}
			}
			return retSpecification;
		}
	}

	/**
	 * アビリティによる検索成形用
	 * 
	 * @param types List<Integer> 検索対象タイプIDリスト
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> abilitySearch(int ability, String n1, String n2) {
		return ability == 0 ? null : abilityEqual(ability, n1).or(abilityEqual(ability, n2));
	}

	/**
	 * アビリティによる検索
	 * 
	 * @param ability int アビリティId
	 * @param no      String タイプNo
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> abilityEqual(int ability, String no) {
		return (root, query, builder) -> {
			return builder
					.equal(root.join("ability" + no, JoinType.LEFT)
							.get("ability_id"), ability);
		};
	}

	/**
	 * 高さ、重さによる検索成形用
	 * 
	 * @param point Integer 高さ、重さのポイント
	 * @param type  String 高さか重さの検索分岐用
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> heightWeightSearch(Integer point, String type) {
		switch (point) {
			case 0: // サイズ選択なし
			case 7: // 全てのサイズ
			default:
				return null;
			case 1:
				// 一番左のみ選択時（最小サイズ のみ）
				return sizeLessThan(Constants.MIDDLE, type);
			case 2:
				// 中央のみ選択時（中間サイズ のみ）
				return (sizeGreaterThanOrEqual(Constants.MIDDLE, type)).and(sizeLessThan(Constants.LARGE, type));
			case 3:
				// 一番左と中央選択時（最小サイズ または 中間サイズ）
				return sizeLessThan(Constants.LARGE, type);
			case 4:
				// 一番右のみ選択時（最大サイズ のみ）
				return sizeGreaterThanOrEqual(Constants.LARGE, type);
			case 5:
				// 一番左と一番右選択時（最小サイズ または 最大サイズ）
				return (sizeGreaterThanOrEqual(Constants.LARGE, type)).or(sizeLessThan(Constants.MIDDLE, type));
			case 6:
				return null;
		}
	}

	/**
	 * Pokemonの高さ、重さによる検索（規定値未満）
	 * 
	 * @param type String 高さか重さのどちらの判定かを分岐
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> sizeLessThan(String scale, String type) {
		return (root, query, builder) -> {
			return type == "height" ? builder
					.lessThan(root.get("height"), Constants.POKE_HEIGHT.get(scale))
					: type == "weight" ? builder
							.lessThan(root.get("weight"), Constants.POKE_WEIGHT.get(scale))
							: null;
		};
	}

	/**
	 * Pokemonの高さ、重さによる検索（規定値以上）
	 * 
	 * @param type String 高さか重さのどちらの判定かを分岐
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> sizeGreaterThanOrEqual(String scale, String type) {
		return (root, query, builder) -> {
			return type == "height" ? builder
					.greaterThanOrEqualTo(root.get("height"), Constants.POKE_HEIGHT.get(scale))
					: type == "weight" ? builder
							.greaterThanOrEqualTo(root.get("weight"), Constants.POKE_WEIGHT.get(scale))
							: null;
		};
	}
}
