package pokedex.pxt.mbo.pokedex.entity.pokemon;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
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
@Embeddable
public class EvolutionPkey implements Serializable{
	public int pokemonId;
	public int formId;
	public int nextPokemonId;
	public int nextFormId;
}
