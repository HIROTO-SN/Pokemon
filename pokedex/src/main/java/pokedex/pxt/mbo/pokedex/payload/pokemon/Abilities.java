package pokedex.pxt.mbo.pokedex.payload.pokemon;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Abilities {
	private Map<String, String> ability;
	private Boolean isHidden;
	private int slot;
}
