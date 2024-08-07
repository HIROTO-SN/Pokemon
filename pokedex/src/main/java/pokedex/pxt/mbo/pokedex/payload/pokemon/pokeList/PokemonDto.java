package pokedex.pxt.mbo.pokedex.payload.pokemon.pokeList;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PokemonDto {
	private boolean hasMoreThanTwoPages;
	private List<PokemonBasic> pokemonList;
}
