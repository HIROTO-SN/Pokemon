package pokedex.pxt.mbo.pokedex.payload.pokemon.details;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pagination {
	private String idtype;
	private int pokemonId;
	private String pokemonName;
}
