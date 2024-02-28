package pokedex.pxt.mbo.pokedex.specification;

import java.util.List;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import pokedex.pxt.mbo.pokedex.common.Constants;

public class PokemonSpecification<Pokemon> {
	/**
	 * Pokemonをソートし、formId=1のものだけ抽出
	 * @param sort String ソート種類(asc または desc)
	 * @return Specification<Pokemon>
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
	 * @param types List<Integer> 検索対象タイプIDリスト
	 * @param n1 String type1
	 * @param n2 String type2
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
	 * @param type Integer タイプ2ID
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> typeEqual(Integer type, String no) {
		return type == null  ? null : (root, query, builder) -> {
			return builder
					.equal(root.join("type" + no, JoinType.INNER)
					.get("type_id"), type.intValue());
		};
	}

	/**
	 * 高さ、重さによる検索成形用
	 * @param point Integer 高さ、重さのポイント
	 * @param type String 高さか重さの検索分岐用
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
	 * @param type String 高さか重さのどちらの判定かを分岐
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> sizeLessThan(String scale, String type) {
		return (root, query, builder) -> {
			return type == "height" ? 
				builder
					.lessThan(root.get("height"), Constants.POKE_HEIGHT.get(scale))
				: type == "weight" ?
				builder
					.lessThan(root.get("weight"), Constants.POKE_WEIGHT.get(scale))
				: null;
		};
	}

	/**
	 * Pokemonの高さ、重さによる検索（規定値以上）
	 * @param type String 高さか重さのどちらの判定かを分岐
	 * @return Specification<Pokemon>
	 */
	public Specification<Pokemon> sizeGreaterThanOrEqual(String scale, String type) {
		return (root, query, builder) -> {
			return type == "height" ? 
				builder
					.greaterThanOrEqualTo(root.get("height"), Constants.POKE_HEIGHT.get(scale))
				: type == "weight" ?
				builder
					.greaterThanOrEqualTo(root.get("weight"), Constants.POKE_WEIGHT.get(scale))
				: null;
		};
	}
}
