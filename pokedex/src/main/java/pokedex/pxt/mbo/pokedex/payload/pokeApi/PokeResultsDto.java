package pokedex.pxt.mbo.pokedex.payload.pokeApi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PokeResultsDto {
		
	private String name;
	
	private String url;
}
