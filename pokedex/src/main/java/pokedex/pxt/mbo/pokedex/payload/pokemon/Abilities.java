package pokedex.pxt.mbo.pokedex.payload.pokemon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Abilities {
	private int slot;
	private String name;
}
