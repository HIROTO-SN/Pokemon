package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.TypeChart;

public interface TypeChartRepository extends JpaRepository<TypeChart, Integer>, JpaSpecificationExecutor<TypeChart> {
	/*
	 * type1とtype2で検索
	 */
	public TypeChart findByType1AndType2(Integer type1, Integer type2);

}
