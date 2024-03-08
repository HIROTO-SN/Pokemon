package pokedex.pxt.mbo.pokedex.entity.pokemon;

import jakarta.persistence.Column;
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
@Table(name = "Weaknesses")
public class Weaknesses {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "weak_id")
	private int weakId;
	@Column(name = "type_1")
	private Integer type1;
	@Column(name = "type_2")
	private Integer type2;
	private double normal;
	private double fire;
	private double water;
	private double electric;
	private double grass;
	private double ice;
	private double fighting;
	private double poison;
	private double ground;
	private double flying;
	private double psychic;
	private double bug;
	private double rock;
	private double ghost;
	private double dragon;
	private double dark;
	private double steel;
	private double fairy;
	
}
