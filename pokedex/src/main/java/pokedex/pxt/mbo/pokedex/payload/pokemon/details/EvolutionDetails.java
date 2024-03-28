package pokedex.pxt.mbo.pokedex.payload.pokemon.details;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pokedex.pxt.mbo.pokedex.payload.pokemon.TypesDto;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvolutionDetails {
	private int stage;
	private int formId;
	private int pokemonId;
	private String pokemonName;
	private String src;
	private List<TypesDto> types;
	private List<EvolutionDetails> next;
}
