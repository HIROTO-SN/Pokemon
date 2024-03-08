package pokedex.pxt.mbo.pokedex.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Weaknesses;

public interface WeaknessRepository extends JpaRepository <Weaknesses, Integer>, JpaSpecificationExecutor<Weaknesses>{
	// public Weaknesses findByType1AndType2(int type1, )	
}
