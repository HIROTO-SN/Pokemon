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
	private List<Integer> types;
	private List<Integer> weaks;
	private int numberRangeMin;
	private int numberRangeMax;
	private int ability;
	private List<String> height;
	private List<String> weight;
	private Integer heightPoint;
	private Integer weightPoint;
	private String sortBy;
	private int pageNumber;
	private Boolean initFlg;
}
