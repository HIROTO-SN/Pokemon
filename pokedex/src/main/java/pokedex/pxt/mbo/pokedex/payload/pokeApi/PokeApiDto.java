package pokedex.pxt.mbo.pokedex.payload.pokeApi;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PokeApiDto {
	private int count;

	private String next;

	private String previous;

	private List<PokeResultsDto> results;

}
