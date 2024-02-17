package pokedex.pxt.mbo.pokedex.entity.pokemon;

import java.util.Map;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "abilities")
public class Abilities {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ability_id;
	private String ability_name;
	private Boolean isHidden;
}
