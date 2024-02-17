package pokedex.pxt.mbo.pokedex.entity.pokemon;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Types {
	private int type_id;
	private Map<String, String> type;
}
