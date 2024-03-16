package pokedex.pxt.mbo.pokedex.entity.pokemon;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "evolutions")
@IdClass(value = EvolutionPkey.class)
public class Evolution {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "pokemon_id")
	private int pokemonId;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "form_id")
	private int formId;

	@Column(name = "next_pokemon_id", nullable = true)
	private int nextPokemonId;

	@Column(name = "next_form_id", nullable = true)
	private int nextFormId;

	@Column(nullable = false)
	private int stage;

	// @Transient
	// @ManyToOne
	// @JoinColumn(name = "pokemon_id", referencedColumnName = "pokemon_id")
	// private Pokemon pokemon;

}
