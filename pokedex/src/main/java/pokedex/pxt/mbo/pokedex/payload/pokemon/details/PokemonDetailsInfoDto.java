package pokedex.pxt.mbo.pokedex.payload.pokemon.details;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PokemonDetailsInfoDto {
	private int pokemonId;
	private List<PokemonDetails> pokemonDetails;
	private List<EvolutionDetails> evolutionDetails;
}
