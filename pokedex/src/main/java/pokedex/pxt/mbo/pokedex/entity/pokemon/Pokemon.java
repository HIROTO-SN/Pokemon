package pokedex.pxt.mbo.pokedex.entity.pokemon;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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

	// private int height;
	// private int weight;
	// @OneToOne
	// @JoinColumn(name = "type1", insertable = false, updatable = false)
	// private Types type1;
	// @OneToOne
	// @JoinColumn(name = "type2",insertable = false, updatable = false)
	// private Types type2;
	// private int gender;
	// private int category;
	// private String v1_description;
	// private String v2_description;
	// @OneToOne
	// @JoinColumn(name = "ability1",insertable = false, updatable = false)
	// private Abilities ability1;
	// @OneToOne
	// @JoinColumn(name = "ability2",insertable = false, updatable = false)
	// private Abilities ability2;
	// @OneToOne
	// @JoinColumn(name = "ability_hidden",insertable = false, updatable = false)
	// private Abilities ability_hidden;
	// private int stats_hp;
	// private int stats_attack;
	// private int stats_defense;
	// private int stats_specialAttack;
	// private int stats_specialDefense;
	// private int stats_speed;
}
