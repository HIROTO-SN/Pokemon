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
public class PokemonDetailsDto {
	private int id;
	private String name;
	private String src;
	private List<DetailsStrVal> versions;
	private List<DetailsIntVal> statList;
	private AttributeDetails attribute;
}
