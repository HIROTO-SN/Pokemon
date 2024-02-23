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
public class SearchDto {
	private String searchInput;
	private List<Types> types;
	private int numberRangeMin;
	private int numberRangeMax;
	private String height;	
	private String weight;
	private String sortBy;
	private int pageNumber;
	private Boolean initFlg;
}
