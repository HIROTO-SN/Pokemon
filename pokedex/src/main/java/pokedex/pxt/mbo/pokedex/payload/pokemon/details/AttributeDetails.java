package pokedex.pxt.mbo.pokedex.payload.pokemon.details;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pokedex.pxt.mbo.pokedex.payload.pokemon.TypesDto;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttributeDetails {
	private AttLeft att_left;
	private AttRight att_right;
	private List<TypesDto> types;
	private List<WeakDto> weaks;

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class AttLeft {
		private DetailsDblVal height;
		private DetailsDblVal weight;
		private DetailsIntVal gender;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class AttRight {
		private DetailsStrVal category;
		private Abilities abilities;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Abilities {
		private String name;
		private List<DetailsStrVal> val;
	}

	@Getter
	@Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class WeakDto {
		private int type_id;
		private String name;
		private double effectivePoint;
	}

}
