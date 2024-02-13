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
	private int order;
	private String name;
	private List<Abilities> abilities;
	private List<Types> types;
	private int height;
	private int weight;
	private String picurl;
}
