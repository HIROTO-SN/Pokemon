package pokedex.pxt.mbo.pokedex.models;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
public class Item {

	@Id
	// @GeneratedValue(strategy=GenerationType.IDENTITY)
	private String itemId;

	private String itemName;

	private String itemCategory;
}
