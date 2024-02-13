package pokedex.pxt.mbo.pokedex.payload.pokemon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Types {
	private int slot;
	private String name;
	private String url;
}
