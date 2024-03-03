package pokedex.pxt.mbo.pokedex.entity.pokemon;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "pokedex")
@IdClass(value=PokemonPkey.class)

public class Pokemon {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pokemon_id")
	private int pokemonId;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "form_id")
	private int formId;

	@Column(name = "pokemon_name", nullable = false, unique = true)
	private String pokemonName;

	@Column(nullable = true)
	private double height;

	@Column(nullable = true)
	private double weight;
	
	@ManyToOne
	@JoinColumn(name = "type_1", insertable = false)
	private Types type1;
	
	@ManyToOne
	@JoinColumn(name = "type_2", insertable = false)
	private Types type2;
	
	@ManyToOne
	@JoinColumn(name = "ability_1",insertable = false)
	private Abilities ability1;
	
	@ManyToOne
	@JoinColumn(name = "ability_2",insertable = false)
	private Abilities ability2;
	
	@ManyToOne
	@JoinColumn(name = "ability_hidden",insertable = false)
	private Abilities ability_hidden;

	// @Column(name = "ability1")
	// private String ability_1;
	
	// @Column(name = "ability2")
	// private String ability_2;
	
	// @Column(name = "ability_hidden")
	// private String ability_hidden;
	
	// private int gender;
	// private int category;
	// private String v1_description;
	// private String v2_description;
	// @ManyToOne
	// private int stats_hp;
	// private int stats_attack;
	// private int stats_defense;
	// private int stats_specialAttack;
	// private int stats_specialDefense;
	// private int stats_speed;
}
