package pokedex.pxt.mbo.pokedex.repository;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pokedex.pxt.mbo.pokedex.entity.pokemon.Pokemon;
import pokedex.pxt.mbo.pokedex.entity.pokemon.PokemonPkey;

public interface PokemonRepository extends JpaRepository<Pokemon, PokemonPkey>{
		public Optional<List<Pokemon>> findByPokemonNameLike(String pokemoName);
}
