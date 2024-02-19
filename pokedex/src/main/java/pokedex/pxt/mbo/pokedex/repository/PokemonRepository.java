package pokedex.pxt.mbo.pokedex.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;

public interface PokemonRepository extends JpaRepository<Pokemon, Integer>{
		public Optional<List<Pokemon>> findByName(String pokemoName);
}
