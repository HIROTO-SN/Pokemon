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
@Table(name = "types")
public class Types {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int type_id;
	@Column(nullable = false)
	private String name;
	// @Column(nullable = false)
	// private double normal;
	// @Column(nullable = false)
	// private double fire;
	// @Column(nullable = false)
	// private double water;
	// @Column(nullable = false)
	// private double electric;
	// @Column(nullable = false)
	// private double grass;
	// @Column(nullable = false)
	// private double ice;
	// @Column(nullable = false)
	// private double fighting;
	// @Column(nullable = false)
	// private double poison;
	// @Column(nullable = false)
	// private double ground;
	// @Column(nullable = false)
	// private double flying;
	// @Column(nullable = false)
	// private double psychic;
	// @Column(nullable = false)
	// private double bug;
	// @Column(nullable = false)
	// private double rock;
	// @Column(nullable = false)
	// private double ghost;
	// @Column(nullable = false)
	// private double dragon;
	// @Column(nullable = false)
	// private double dark;
	// @Column(nullable = false)
	// private double steel;
	// @Column(nullable = false)
	// private double fairy;
}
