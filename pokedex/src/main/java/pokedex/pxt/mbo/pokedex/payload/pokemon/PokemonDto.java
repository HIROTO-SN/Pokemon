package pokedex.pxt.mbo.pokedex.payload.pokemon;

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
	private int pokemonId;
	private int formId;
	private String pokemonName;
	private List<TypesDto> types;
}
