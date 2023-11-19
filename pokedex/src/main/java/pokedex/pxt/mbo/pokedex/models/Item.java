package pokedex.pxt.mbo.pokedex.models;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Item {
	private String itemId;
	private String itemName;
	private String itemCategory;
}
