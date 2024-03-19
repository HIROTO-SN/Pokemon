package pokedex.pxt.mbo.pokedex.entity.pokemon;

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

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "next_pokemon_id")
	private int nextPokemonId;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "next_form_id")
	private int nextFormId;

	@Column(nullable = false)
	private int stage;

	@Column(name="group_id", nullable = false)
	private int groupId;

	@ManyToOne
	@JoinColumns({
		@JoinColumn(name = "pokemon_id", referencedColumnName = "pokemon_id"),
		@JoinColumn(name = "form_id", referencedColumnName = "form_id")
	})
	private Pokemon pokemon;

}
