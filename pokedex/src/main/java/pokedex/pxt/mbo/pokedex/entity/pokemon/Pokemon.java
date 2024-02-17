package pokedex.pxt.mbo.pokedex.entity.pokemon;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pokemon {
	private int poke_id;
	private String name;
	private int ability1;
	private String ability1Hidden;
	private int ability2;
	private String ability2Hidden;
	private int ability3;
	private String ability3Hidden;
	private int ability4;
	private String ability4Hidden;
	private int type1;
	private int type2;
	private int type3;
	private int height;
	private int weight;
	private String picurl;
}
