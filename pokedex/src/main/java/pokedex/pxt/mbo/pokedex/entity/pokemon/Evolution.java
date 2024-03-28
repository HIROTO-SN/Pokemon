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
public class Evolution {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "evolution_id")
	private int evolutionId;

	@Column(name = "pokemon_id", nullable = false)
	private int pokemonId;

	@Column(name = "form_id", nullable = false)
	private int formId;

	@Column(name = "next_pokemon_id", nullable = true)
	private String nextPokemonId;

	@Column(name = "next_form_id", nullable = true)
	private String nextFormId;

	@Column(name = "stage", nullable = true)
	private String stage;

	@Column(name="group_id", nullable = true)
	private String groupId;

	@ManyToOne
	@JoinColumns({
		@JoinColumn(name = "pokemon_id", referencedColumnName = "pokemon_id", insertable = false, updatable = false),
		@JoinColumn(name = "form_id", referencedColumnName = "form_id", insertable = false, updatable = false)
	})
	private Pokemon pokemon;

}
