package pokedex.pxt.mbo.pokedex.payload.pokemon.pokeList;

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
public class PokemonBasic {
	private int pokemonId;
	private int formId;
	private String pokemonName;
	private List<TypesDto> types;
}
