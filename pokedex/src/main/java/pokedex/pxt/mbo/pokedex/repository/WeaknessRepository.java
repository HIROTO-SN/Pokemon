package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Weaknesses;

public interface WeaknessRepository extends JpaRepository<Weaknesses, Integer>, JpaSpecificationExecutor<Weaknesses> {
	/*
	 * Type_1で検索
	 */
	public Weaknesses findByType1(int type1);

	/*
	 * Type_1 and Type_2で検索
	 */
	public Weaknesses findByType1AndType2(int type1, int type2);
}
