package pokedex.pxt.mbo.pokedex.entity.test;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
// @Entity
public class Item {

	// @GeneratedValue(strategy=GenerationType.IDENTITY)
	// @Id
	private String itemId;

	private String itemName;

	private String itemCategory;
}
