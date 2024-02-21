package pokedex.pxt.mbo.pokedex.entity.pokemon;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PokemonPkey implements Serializable{
	public int pokemonId;
	public int formId; 

}
