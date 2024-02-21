package pokedex.pxt.mbo.pokedex.payload.pokemon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchDto {
	private String searchInput;
	private int numberRangeMin;
	private int numberRangeMax;
	private String sortBy;
	private int lastPokeId;
}
